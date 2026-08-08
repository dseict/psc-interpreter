import {
  CharStream,
  CommonTokenStream,
  ErrorListener,
  ParserRuleContext,
  Token,
} from "antlr4";
import PSCLexer from "./antlr/PSCLexer";
import PSCParser, {
  AddExprContext,
  AndExprContext,
  ArrayLitsContext,
  AsmStmtContext,
  AtomContext,
  BlockContext,
  CompExprContext,
  DoWhileStmtContext,
  ExpExprContext,
  ExprContext,
  FloatLitsContext,
  ForStmtContext,
  GroupExprContext,
  IfStmtContext,
  InputStmtContext,
  IntLitsContext,
  LitsContext,
  LvalueContext,
  MulExprContext,
  NotExprContext,
  OrExprContext,
  OutputStmtContext,
  PrimaryExprContext,
  ProgramContext,
  RepeatUntilStmtContext,
  StmtContext,
  StmtsContext,
  UnaryExprContext,
  WhileStmtContext,
} from "./antlr/PSCParser";
import PSCParserVisitor from "./antlr/PSCParserVisitor";
import {
  AccessNonExistingVariableError,
  ArrayAccessNotArrayError,
  ConditionNotBooleanError,
  ForRangeNotNumberError,
  ForVariableReuseError,
  ImpossibleError,
  InvalidArrayIndexError,
  OperationValueTypeMismatchError,
} from "./error";
export type InterpreterOptions = {
  strictVariableScope: boolean;
  arrayStartIndex: number;
  outputFunction?: (output: any) => void;
  inputFunction?: () => Promise<any>;
};

export async function interpret(
  code: string,
  options?: Partial<InterpreterOptions>,
): Promise<void> {
  // Parse the code
  const lexer = new PSCLexer(new CharStream(code));
  const parser = new PSCParser(new CommonTokenStream(lexer));
  parser.removeErrorListeners(); // Remove default error listeners
  parser.addErrorListener(new PSCErrorListener());
  const tree = parser.program();

  // Execute the code
  const interpreter = new PSCInterpreter({
    strictVariableScope: false,
    arrayStartIndex: 1,
    ...options, // Override default options with user-provided options
  });
  await interpreter.visit(tree);
}

function smartCast(value: any): any {
  if (typeof value === "string") {
    // Try to cast to number
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      return numValue;
    }
    // Try to cast to boolean
    if (value.toLowerCase() === "true") {
      return true;
    }
    if (value.toLowerCase() === "false") {
      return false;
    }
  }
  return value; // Return as is if no casting is possible
}

class PSCInterpreter extends PSCParserVisitor<Promise<any>> {
  variableStack: Record<string, any>[] = [{}]; // Stack of variable scopes
  options: InterpreterOptions;
  currentCtx?: ParserRuleContext;

  constructor(options: InterpreterOptions) {
    super();
    this.options = options;
  }

  assignVariable(name: string, value: any): void {
    // Found if the variable is declared, and reassign it in the correct scope
    for (const stack of this.variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        stack[name] = value;
        return;
      }
    }
    // If variable not found declared, assign it to the current scope
    this.variableStack[this.variableStack.length - 1]![name] = value;
  }

  readVariable(name: string): any {
    for (const stack of this.variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        return stack[name];
      }
    }

    throw new AccessNonExistingVariableError(this.currentCtx, name);
  }

  deleteVariable(name: string): void {
    for (const stack of this.variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        delete stack[name];
        return;
      }
    }
    throw new ImpossibleError(
      this.currentCtx,
      `Cannot delete variable '${name}' because it does not exist.`,
    );
  }

  variableExists(name: string): boolean {
    for (const stack of this.variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        return true;
      }
    }
    return false;
  }

  newVariableStack(): void {
    this.variableStack.push({});
  }

  popVariableStack(): void {
    if (this.variableStack.length === 1) {
      throw new ImpossibleError(
        this.currentCtx,
        "Cannot pop the global variable stack.",
      );
    }
    this.variableStack.pop();
  }

  asString(value: any): string {
    if (Array.isArray(value)) {
      return `[${value.map((v) => this.asString(v)).join(",")}]`;
    } else if (typeof value === "boolean") {
      return value ? "true" : "false";
    } else if (typeof value === "number") {
      return value.toString();
    } else if (typeof value === "string") {
      return value;
    } else if (value === undefined) {
      return "";
    }
    throw new ImpossibleError(
      this.currentCtx,
      `Cannot convert value of type ${typeof value} to string.`,
    );
  }

  override visit = async (ctx: ParserRuleContext) => {
    this.currentCtx = ctx;
    const result = await super.visit(ctx);
    // if result is a promise, wait for it to resolve before returning
    if (result instanceof Promise) {
      return await result;
    }
    return result;
  };

  override visitProgram = async (ctx: ProgramContext): Promise<void> => {
    await this.visit(ctx.stmts());
  };

  // Expression and literals
  override visitExpr = async (ctx: ExprContext): Promise<any> => {
    return await this.visit(ctx.orExpr());
  };

  override visitOrExpr = async (ctx: OrExprContext): Promise<any> => {
    let result = smartCast(await this.visit(ctx.andExpr(0)));
    for (let i = 1; i < ctx.andExpr_list().length; i++) {
      const right = smartCast(await this.visit(ctx.andExpr(i)));
      const resultBool = typeof result == "boolean";
      const rightBool = typeof right == "boolean";
      if (!resultBool || !rightBool) {
        throw new OperationValueTypeMismatchError(
          ctx,
          "OR",
          "boolean",
          !resultBool ? result : right,
        );
      }
      result = result || right;
    }
    return result;
  };

  override visitAndExpr = async (ctx: AndExprContext): Promise<any> => {
    let result = smartCast(await this.visit(ctx.compExpr(0)));
    for (let i = 1; i < ctx.compExpr_list().length; i++) {
      const right = smartCast(await this.visit(ctx.compExpr(i)));
      const resultBool = typeof result == "boolean";
      const rightBool = typeof right == "boolean";
      if (!resultBool || !rightBool) {
        throw new OperationValueTypeMismatchError(
          ctx,
          "AND",
          "boolean",
          !resultBool ? result : right,
        );
      }

      result = result && right;
    }
    return result;
  };

  override visitCompExpr = async (ctx: CompExprContext): Promise<any> => {
    let result = smartCast(await this.visit(ctx.addExpr(0)));
    for (let i = 1; i < ctx.addExpr_list().length; i++) {
      const right = smartCast(await this.visit(ctx.addExpr(i)));
      const operator = ctx.compOp(i - 1).getText();
      switch (operator) {
        case "=":
          result = result === right;
          break;
        case "<>":
          result = result !== right;
          break;
        case ">":
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(
              ctx,
              ">",
              typeof result,
              right,
            );
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(
              ctx,
              ">",
              "string or number",
              `${result} <= ${right}`,
            );
          }
          result = result > right;
          break;
        case "<":
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(
              ctx,
              "<",
              typeof result,
              right,
            );
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(
              ctx,
              "<",
              "string or number",
              `${result} <= ${right}`,
            );
          }
          result = result < right;
          break;
        case ">=":
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(
              ctx,
              ">=",
              typeof result,
              right,
            );
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(
              ctx,
              ">=",
              "string or number",
              `${result} <= ${right}`,
            );
          }
          result = result >= right;
          break;
        case "<=":
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(
              ctx,
              "<=",
              typeof result,
              right,
            );
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(
              ctx,
              "<=",
              "string or number",
              `${result} <= ${right}`,
            );
          }
          result = result <= right;
          break;
        default:
          throw new ImpossibleError(
            ctx,
            `Unknown comparison operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitAddExpr = async (ctx: AddExprContext): Promise<any> => {
    let result = smartCast(await this.visit(ctx.mulExpr(0)));
    for (let i = 1; i < ctx.mulExpr_list().length; i++) {
      const right = smartCast(await this.visit(ctx.mulExpr(i)));
      const resultNum = typeof result === "number";
      const rightNum = typeof right === "number";
      if (!resultNum || !rightNum) {
        throw new OperationValueTypeMismatchError(
          ctx,
          "Addition or subtraction",
          "number",
          !resultNum ? result : right,
        );
      }
      const operator = ctx.addOp(i - 1).getText();
      switch (operator) {
        case "+":
          result += right;
          break;
        case "-":
          result -= right;
          break;
        default:
          throw new ImpossibleError(
            ctx,
            `Unknown addition/subtraction operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitMulExpr = async (ctx: MulExprContext): Promise<any> => {
    let result = smartCast(await this.visit(ctx.expExpr(0)));
    for (let i = 1; i < ctx.expExpr_list().length; i++) {
      const right = smartCast(await this.visit(ctx.expExpr(i)));
      const resultNum = typeof result === "number";
      const rightNum = typeof right === "number";
      if (!resultNum || !rightNum) {
        throw new OperationValueTypeMismatchError(
          ctx,
          "Addition or subtraction",
          "number",
          !resultNum ? result : right,
        );
      }
      const operator = ctx.mulOp(i - 1).getText();
      switch (operator) {
        case "*":
          result *= right;
          break;
        case "/":
          result /= right;
          break;
        case "%":
          result %= right;
          break;
        default:
          throw new ImpossibleError(
            ctx,
            `Unknown multiplication operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitExpExpr = async (ctx: ExpExprContext): Promise<any> => {
    let result = await this.visit(ctx.unaryExpr(0));
    for (let i = 1; i < ctx.unaryExpr_list().length; i++) {
      const right = smartCast(await this.visit(ctx.unaryExpr(i)));
      const resultNum = typeof result === "number";
      const rightNum = typeof right === "number";
      if (!resultNum || !rightNum) {
        throw new OperationValueTypeMismatchError(
          ctx,
          "Addition or subtraction",
          "number",
          !resultNum ? result : right,
        );
      }
      const operator = ctx.expOp(i - 1).getText();
      switch (operator) {
        case "**":
        case "^":
          result **= right;
          break;
        default:
          throw new ImpossibleError(
            ctx,
            `Unknown exponentiation operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitUnaryExpr = async (ctx: UnaryExprContext): Promise<any> => {
    const minusCount = ctx.MINUS_list().length;
    const value = smartCast(await this.visit(ctx.notExpr()));
    if (typeof value !== "number" && minusCount > 0) {
      throw new OperationValueTypeMismatchError(ctx, "NOT", "boolean", value);
    }
    return minusCount % 2 === 0 ? value : -value;
  };

  override visitNotExpr = async (ctx: NotExprContext): Promise<any> => {
    const notCount = ctx.NOT_list().length;
    const value = smartCast(await this.visit(ctx.primaryExpr()));
    if (typeof value !== "boolean" && notCount > 0) {
      throw new OperationValueTypeMismatchError(ctx, "NOT", "boolean", value);
    }
    return notCount % 2 === 0 ? value : !value;
  };

  override visitPrimaryExpr = async (ctx: PrimaryExprContext): Promise<any> => {
    if (ctx.LSQUARE() && ctx.RSQUARE()) {
      const indices = await Promise.all(
        ctx.expr_list().map((expr) => this.visit(expr)),
      );
      // Validate that the left primaryExpr is an array
      const arr = await this.visit(ctx.primaryExpr());
      if (!Array.isArray(arr)) {
        throw new ArrayAccessNotArrayError(ctx, this.asString(arr));
      }
      // Validate all indices
      for (const index of indices) {
        if (typeof index !== "number" || !Number.isInteger(index)) {
          throw new InvalidArrayIndexError(ctx, this.asString(index));
        }
        if (index < 1 || index > arr.length) {
          throw new InvalidArrayIndexError(ctx, this.asString(index));
        }
      }
      return indices.reduce(
        (acc, index) => acc[index - this.options.arrayStartIndex],
        arr,
      );
    } else if (ctx.groupExpr()) {
      return await this.visit(ctx.groupExpr());
    }
    throw new ImpossibleError(ctx, "Invalid primary");
  };

  override visitGroupExpr = async (ctx: GroupExprContext): Promise<any> => {
    if (ctx.expr()) {
      return await this.visit(ctx.expr());
    } else if (ctx.atom()) {
      return await this.visit(ctx.atom());
    }
  };

  override visitAtom = async (ctx: AtomContext): Promise<any> => {
    if (ctx.lits()) {
      return await this.visit(ctx.lits());
    } else if (ctx.ID()) {
      // Handle variable lookup here
      return this.readVariable(ctx.ID().getText());
    }
    throw new ImpossibleError(ctx, "Invalid atom");
  };

  override visitLits = async (ctx: LitsContext): Promise<any> => {
    if (ctx.floatLits()) {
      return await this.visit(ctx.floatLits());
    } else if (ctx.intLits()) {
      return await this.visit(ctx.intLits());
    } else if (ctx.arrayLits()) {
      return await this.visit(ctx.arrayLits());
    } else if (ctx.STRING()) {
      return ctx.STRING().getText().slice(1, -1); // Remove quotes
    } else if (ctx.BOOLEAN()) {
      return ctx.BOOLEAN().getText().toLowerCase() === "true";
    }
  };

  override visitIntLits = async (ctx: IntLitsContext): Promise<number> => {
    const sign = ctx.MINUS() !== null ? -1 : 1;
    return parseInt(ctx.INTEGER().getText(), 10) * sign;
  };

  override visitFloatLits = async (ctx: FloatLitsContext): Promise<number> => {
    const sign = ctx.MINUS() !== null ? -1 : 1;
    return parseFloat(ctx.FLOAT().getText()) * sign;
  };

  override visitArrayLits = async (ctx: ArrayLitsContext): Promise<any[]> => {
    const elements: any[] = [];
    if (ctx.expr_list()) {
      for (const expr of ctx.expr_list()) {
        elements.push(await this.visit(expr));
      }
    }
    return elements;
  };

  override visitStmts = async (ctx: StmtsContext): Promise<void> => {
    for (const child of ctx.children || []) {
      if (child instanceof ParserRuleContext) {
        await this.visit(child);
      }
    }
  };

  override visitStmt = async (ctx: StmtContext): Promise<void> => {
    for (const child of ctx.children || []) {
      if (child instanceof ParserRuleContext) {
        await this.visit(child);
      }
    }
  };

  override visitBlock = async (ctx: BlockContext): Promise<void> => {
    if (this.options.strictVariableScope) {
      this.newVariableStack();
    }
    await this.visit(ctx.stmts());
    if (this.options.strictVariableScope) {
      this.popVariableStack();
    }
  };

  override visitIfStmt = async (ctx: IfStmtContext): Promise<void> => {
    // Validate statement structure
    if (ctx.expr() === null) {
      throw new ImpossibleError(
        ctx,
        "If statement must have a condition expression.",
      );
    }
    if (ctx.block(0) === null) {
      throw new ImpossibleError(ctx, "If statement must have a 'then' block.");
    }
    if (ctx.ELSE() && ctx.block(1) === null && ctx.ifStmt() === null) {
      throw new ImpossibleError(
        ctx,
        "If statement with 'else' must have an 'else' block or an 'else if' statement.",
      );
    }
    const condition = ctx.expr();
    if (condition) {
      // Evaluate the condition
      const result = await this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new ConditionNotBooleanError(ctx.expr(), result);
      }
      if (result) {
        // Execute the 'then' block
        await this.visit(ctx.block(0));
      } else if (ctx.ELSE()) {
        if (ctx.block_list().length == 2) {
          // Execute the block after else
          // Execute the 'else' block if it exists
          await this.visit(ctx.block(1));
        } else if (ctx.ifStmt()) {
          // Execute the ifStmt after else
          await this.visit(ctx.ifStmt());
        }
      }
    }
  };

  override visitWhileStmt = async (ctx: WhileStmtContext): Promise<void> => {
    // Validate statement structure
    if (ctx.expr() === null) {
      throw new ImpossibleError(
        ctx,
        "While statement must have a condition expression.",
      );
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(
        ctx,
        "While statement must have a block to execute.",
      );
    }
    const condition = ctx.expr();
    while (true) {
      const result = await this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new ConditionNotBooleanError(
          ctx.expr(),
          `Condition must evaluate to a boolean value, got: ${result}`,
        );
      }
      if (!result) {
        break;
      }
      await this.visit(ctx.block());
    }
  };

  override visitDoWhileStmt = async (
    ctx: DoWhileStmtContext,
  ): Promise<void> => {
    if (ctx.expr() === null) {
      throw new ImpossibleError(
        ctx,
        "Do-While statement must have a condition expression.",
      );
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(
        ctx,
        "Do-While statement must have a block to execute.",
      );
    }
    const condition = ctx.expr();
    let result;
    do {
      await this.visit(ctx.block());
      result = await this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new ConditionNotBooleanError(
          ctx.expr(),
          `Condition must evaluate to a boolean value, got: ${result}`,
        );
      }
    } while (result);
  };

  override visitRepeatUntilStmt = async (
    ctx: RepeatUntilStmtContext,
  ): Promise<void> => {
    if (ctx.expr() === null) {
      throw new ImpossibleError(
        ctx,
        "Do-While statement must have a condition expression.",
      );
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(
        ctx,
        "Do-While statement must have a block to execute.",
      );
    }
    const condition = ctx.expr();
    let result;
    do {
      await this.visit(ctx.block());
      result = await this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new ConditionNotBooleanError(
          ctx.expr(),
          `Condition must evaluate to a boolean value, got: ${result}`,
        );
      }
    } while (!result);
  };

  override visitForStmt = async (ctx: ForStmtContext): Promise<void> => {
    if (ctx.ID() === null) {
      throw new ImpossibleError(
        ctx,
        "For statement must have a loop variable.",
      );
    }
    if (ctx.expr(0) === null || ctx.expr(1) === null) {
      throw new ImpossibleError(
        ctx,
        "For statement must have both 'from' and 'to' expressions.",
      );
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(
        ctx,
        "For statement must have a block to execute.",
      );
    }
    const loopVar = ctx.ID().getText();
    const fromValue = await this.visit(ctx.expr(0));
    const toValue = await this.visit(ctx.expr(1));
    const isDown = ctx.DOWN() !== null;
    if (this.variableExists(loopVar)) {
      throw new ForVariableReuseError(ctx, loopVar);
    }
    if (typeof fromValue !== "number" || typeof toValue !== "number") {
      throw new ForRangeNotNumberError(ctx, `${fromValue} and ${toValue}`);
    }
    for (
      let i = fromValue;
      isDown ? i >= toValue : i <= toValue;
      isDown ? i-- : i++
    ) {
      this.assignVariable(loopVar, i);
      await this.visit(ctx.block());
      this.deleteVariable(loopVar);
    }
  };

  override visitAsmStmt = async (ctx: AsmStmtContext): Promise<void> => {
    const ref = await this.visit(ctx.lvalue());
    const value = await this.visit(ctx.expr());
    ref.set(value);
  };

  override visitLvalue = async (ctx: LvalueContext): Promise<Ref> => {
    if (ctx.ID()) {
      const varName = ctx.ID().getText();
      return {
        get: () =>
          this.variableExists(varName) ? this.readVariable(varName) : undefined,
        set: (value: any) => this.assignVariable(varName, value),
      };
    } else if (ctx.LSQUARE() && ctx.RSQUARE()) {
      const indices = await Promise.all(
        ctx.expr_list().map((expr) => this.visit(expr)),
      );
      // Validate all indices
      for (const index of indices) {
        if (typeof index !== "number" || !Number.isInteger(index)) {
          throw new InvalidArrayIndexError(ctx, index);
        }
        if (index < 1) {
          throw new InvalidArrayIndexError(ctx, this.asString(index));
        }
      }
      const leftRef = await this.visit(ctx.lvalue());
      return {
        get: () => {
          const arr = leftRef.get();
          if (arr === undefined) {
            return undefined;
          }
          if (!Array.isArray(arr)) {
            throw new ArrayAccessNotArrayError(ctx, arr);
          }
          return indices
            .map((index) => index - this.options.arrayStartIndex)
            .reduce((current, index) => current?.[index], arr);
        },
        set: (value: any) => {
          let arr = leftRef.get();
          if (arr === undefined) {
            arr = [];
          }
          if (!Array.isArray(arr)) {
            throw new ArrayAccessNotArrayError(ctx, arr);
          }
          // Navigate to the second-to-last nested level
          const targetParent = indices
            .map((x) => x - 1)
            .slice(0, -1)
            .reduce((current, index) => {
              if (current[index] === undefined) {
                while (current.length <= index) {
                  current.push(undefined);
                }
                current[index] = [];
              }
              if (!Array.isArray(current[index])) {
                throw new ArrayAccessNotArrayError(ctx, current[index]);
              }
              return current[index];
            }, arr); // arr must be an array here

          const lastIndex = indices[indices.length - 1];
          // targetParent must be an array here
          // targetParent is a reference to the array at the second-to-last level
          // this mutates arr
          targetParent[lastIndex - this.options.arrayStartIndex] = value;

          leftRef.set(arr);
        },
      };
    }
    throw new ImpossibleError(ctx, "Invalid assignment left-hand side.");
  };

  override visitInputStmt = async (ctx: InputStmtContext): Promise<void> => {
    const ref = await this.visit(ctx.lvalue());
    const value = await this.options.inputFunction?.();
    ref.set(value);
  };

  override visitOutputStmt = async (ctx: OutputStmtContext): Promise<void> => {
    const val = this.asString(await this.visit(ctx.expr()));
    this.options.outputFunction?.(val);
  };
}

type Ref<T = any> = {
  get: () => T;
  set: (value: T) => void;
};

class PSCErrorListener extends ErrorListener<Token> {
  override syntaxError(
    recognizer: any,
    offendingSymbol: any,
    line: number,
    column: number,
    msg: string,
  ): void {
    throw new SyntaxError(
      `Syntax error at line ${line}, column ${column}: ${msg}`,
    );
  }
}

/* TODO

Strong not or weak not

Features 

Optional strict/weak variable scoping

Variables types
- String
- Number
- Boolean
- Array (not implemented)

= String
== String literal
String literal must be quoted using single quote (') or double quote (")

For example,
- "Hello" and 'Hello' are both valid string literals
- But "Hello' are not

= Number
Number can be integer or float, and can be negative or positive.
== Number literal
Number literal can be written as is.

For example,
- 1, -1, 11.1, -11.11 are all valid number literals
- 01, -01, are also valid
- .1 means 0.1

= Array
Array is a list of values of any type.

== Array index
Array index starts from 1 (i.e. A[0] is not valid).

== Array literal
Array literal must be enclosed by square brackets ([ and ]). Each array element must be separated by a comma.

For example
- [1, 2, 3] is a valid array literal
- ['1', true, 2] is also valid
- [ [1,2], true, ['a', "b"] ] is also valid

== Implicit creation
If an unused identifier is assigned a value at index i, an array with length i of that identifier is implicitly created. The i-th value of that array is automatically assigned.

== Implicit extension
If A is an array of length i, and A[j] <- k, where j > i. Then, the array is automatically extended to length j, with A[j] = k

Smart casting
When performing operations on string, prefer non-string types, e.g. "1" + "2" should be 3 or "true" = true should be true
*/
