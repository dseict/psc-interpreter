import { CharStream, CommonTokenStream, ErrorListener, ParserRuleContext, ParseTree, RuleNode, Token } from "antlr4";
import PSCLexer from "./antlr/PSCLexer";
import PSCParser, { AddExprContext, AndExprContext, AsmStmtContext, AtomContext, BlockContext, CompExprContext, DoWhileStmtContext, ExpExprContext, ExprContext, ForStmtContext, IfStmtContext, InputStmtContext, LitsContext, MulExprContext, NotExprContext, OrExprContext, OutputStmtContext, ProgramContext, RepeatUntilStmtContext, StmtContext, StmtsContext, WhileStmtContext } from "./antlr/PSCParser";
import PSCParserVisitor from "./antlr/PSCParserVisitor";
import { AccessNonExistingVariableError, ConditionNotBooleanError, ForRangeNotNumberError, ForVariableReuseError, ImpossibleError, OperationValueTypeMismatchError } from "./error";
export type InterpreterOptions = {
  strictVariableScope?: boolean;
  outputFunction?: (output: any) => void;
  inputFunction?: () => Promise<any>;
}

export function interpret(code: string, options?: InterpreterOptions): void {
  // Parse the code
  const lexer = new PSCLexer(new CharStream(code));
  const parser = new PSCParser(new CommonTokenStream(lexer));
  parser.removeErrorListeners(); // Remove default error listeners
  parser.addErrorListener(new PSCErrorListener());
  const tree = parser.program();

  // Execute the code
  const interpreter = new PSCInterpreter(options ?? {});
  interpreter.visit(tree);
}

function smartCast(value: any): any {
  if (typeof value === 'string') {
    // Try to cast to number
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      return numValue;
    }
    // Try to cast to boolean
    if (value.toLowerCase() === 'true') {
      return true;
    }
    if (value.toLowerCase() === 'false') {
      return false;
    }
  }
  return value; // Return as is if no casting is possible
}

class PSCInterpreter extends PSCParserVisitor<any> {
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

    throw new AccessNonExistingVariableError(this.currentCtx, name)
  }

  deleteVariable(name: string): void {
    for (const stack of this.variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        delete stack[name];
        return;
      }
    }
    throw new ImpossibleError(this.currentCtx, `Cannot delete variable '${name}' because it does not exist.`);
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
      throw new ImpossibleError(this.currentCtx, "Cannot pop the global variable stack.");
    }
    this.variableStack.pop();
  }

  override visit = (ctx: ParserRuleContext) => {
    this.currentCtx = ctx;
    return super.visit(ctx)
  }

  override visitProgram = (ctx: ProgramContext): void => {
    this.visit(ctx.stmts());
  };

  // Expression and literals
  override visitExpr = (ctx: ExprContext): any => {
    return this.visit(ctx.orExpr());
  }

  override visitOrExpr = (ctx: OrExprContext): any => {
    let result = smartCast(this.visit(ctx.andExpr(0)));
    for (let i = 1; i < ctx.andExpr_list().length; i++) {
      const right = smartCast(this.visit(ctx.andExpr(i)));
      const resultBool = typeof result == "boolean"
      const rightBool = typeof right == "boolean"
      if (!resultBool || !rightBool) {
        throw new OperationValueTypeMismatchError(ctx, "OR", "boolean", !resultBool ? result : right);
      }
      result = result || right;
    }
    return result;
  }

  override visitAndExpr = (ctx: AndExprContext): any => {
    let result = smartCast(this.visit(ctx.notExpr(0)));
    for (let i = 1; i < ctx.notExpr_list().length; i++) {
      const right = smartCast(this.visit(ctx.notExpr(i)));
      const resultBool = typeof result == "boolean"
      const rightBool = typeof right == "boolean"
      if (!resultBool || !rightBool) {
        throw new OperationValueTypeMismatchError(ctx, "AND", "boolean", !resultBool ? result : right);
      }

      result = result && right;
    }
    return result;
  }

  override visitNotExpr = (ctx: NotExprContext): any => {
    const notCount = ctx.NOT_list().length;
    const value = smartCast(this.visit(ctx.compExpr()));
    if (typeof value !== 'boolean' && notCount > 0) {
      throw new OperationValueTypeMismatchError(ctx, "NOT", "boolean", value);
    }
    return notCount % 2 === 0 ? value : !value;
  }

  override visitCompExpr = (ctx: CompExprContext): any => {
    let result = smartCast(this.visit(ctx.addExpr(0)));
    for (let i = 1; i < ctx.addExpr_list().length; i++) {
      const right = smartCast(this.visit(ctx.addExpr(i)));
      const operator = ctx.compOp(i - 1).getText();
      switch (operator) {
        case '=':
          result = result === right;
          break;
        case '<>':
          result = result !== right;
          break;
        case '>':
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(ctx, ">", typeof result, right)
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(ctx, ">", "string or number", `${result} <= ${right}`)
          }
          result = result > right;
          break;
        case '<':
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(ctx, "<", typeof result, right)
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(ctx, "<", "string or number", `${result} <= ${right}`)
          }
          result = result < right;
          break;
        case '>=':
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(ctx, ">=", typeof result, right)
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(ctx, ">=", "string or number", `${result} <= ${right}`)
          }
          result = result >= right;
          break;
        case '<=':
          if (typeof result != typeof right) {
            throw new OperationValueTypeMismatchError(ctx, "<=", typeof result, right)
          }
          if (!["string", "number"].includes(typeof result)) {
            throw new OperationValueTypeMismatchError(ctx, "<=", "string or number", `${result} <= ${right}`)
          }
          result = result <= right;
          break;
        default:
          throw new ImpossibleError(ctx, `Unknown comparison operator: ${operator}`);
      }
    }
    return result;
  }

  override visitAddExpr = (ctx: AddExprContext): any => {
    let result = smartCast(this.visit(ctx.mulExpr(0)));
    for (let i = 1; i < ctx.mulExpr_list().length; i++) {
      const right = smartCast(this.visit(ctx.mulExpr(i)));
      const resultNum = typeof result === 'number'
      const rightNum = typeof right === 'number'
      if (!resultNum || !rightNum) {
        throw new OperationValueTypeMismatchError(ctx, "Addition or subtraction", "number", !resultNum ? result : right);
      }
      const operator = ctx.addOp(i - 1).getText();
      switch (operator) {
        case '+':
          result += right;
          break;
        case '-':
          result -= right;
          break;
        default:
          throw new ImpossibleError(ctx, `Unknown addition/subtraction operator: ${operator}`);
      }
    }
    return result;
  }

  override visitMulExpr = (ctx: MulExprContext): any => {
    let result = smartCast(this.visit(ctx.expExpr(0)));
    for (let i = 1; i < ctx.expExpr_list().length; i++) {
      const right = smartCast(this.visit(ctx.expExpr(i)));
      const resultNum = typeof result === 'number'
      const rightNum = typeof right === 'number'
      if (!resultNum || !rightNum) {
        throw new OperationValueTypeMismatchError(ctx, "Addition or subtraction", "number", !resultNum ? result : right);
      }
      const operator = ctx.mulOp(i - 1).getText();
      switch (operator) {
        case '*':
          result *= right;
          break;
        case '/':
          result /= right;
          break;
        case '%':
          result %= right;
          break;
        default:
          throw new ImpossibleError(ctx, `Unknown multiplication operator: ${operator}`);
      }
    }
    return result;
  }

  override visitExpExpr = (ctx: ExpExprContext): any => {
    let result = smartCast(this.visit(ctx.atom(0)));
    for (let i = 1; i < ctx.atom_list().length; i++) {
      const right = smartCast(this.visit(ctx.atom(i)));
      const resultNum = typeof result === 'number'
      const rightNum = typeof right === 'number'
      if (!resultNum || !rightNum) {
        throw new OperationValueTypeMismatchError(ctx, "Addition or subtraction", "number", !resultNum ? result : right);
      }
      const operator = ctx.expOp(i - 1).getText();
      switch (operator) {
        case '^':
          result **= right;
          break;
        default:
          throw new ImpossibleError(ctx, `Unknown exponentiation operator: ${operator}`);
      }
    }
    return result;
  }

  override visitAtom = (ctx: AtomContext): any => {
    if (ctx.lits()) {
      return this.visit(ctx.lits());
    } else if (ctx.ID()) {
      // Handle variable lookup here
      return this.readVariable(ctx.ID().getText());
    } else if (ctx.expr()) {
      return this.visit(ctx.expr());
    }
    throw new ImpossibleError(ctx, "Invalid atom");
  }

  override visitLits = (ctx: LitsContext): any => {
    if (ctx.FLOAT()) {
      const sign = ctx.MINUS() !== null ? -1 : 1;
      return parseFloat(ctx.FLOAT().getText()) * sign;
    }
    else if (ctx.INTEGER()) {
      const sign = ctx.MINUS() !== null ? -1 : 1;
      return parseInt(ctx.INTEGER().getText(), 10) * sign;
    } else if (ctx.STRING()) {
      return ctx.STRING().getText().slice(1, -1); // Remove quotes
    } else if (ctx.BOOLEAN()) {
      return ctx.BOOLEAN().getText().toLowerCase() === 'true';
    }
  }

  override visitStmts = (ctx: StmtsContext): void => {
    ctx.children?.forEach((child) => {
      if (child instanceof ParserRuleContext) {
        this.visit(child);
      }
    });
  }

  override visitStmt = (ctx: StmtContext): void => {
    ctx.children?.forEach((child) => {
      if (child instanceof ParserRuleContext) {
        this.visit(child);
      }
    });
  }

  override visitBlock = (ctx: BlockContext): void => {
    if (this.options.strictVariableScope) {
      this.newVariableStack();
    }
    this.visit(ctx.stmts());
    if (this.options.strictVariableScope) {
      this.popVariableStack();
    }
  }

  override visitIfStmt = (ctx: IfStmtContext): void => {
    // Validate statement structure
    if (ctx.expr() === null) {
      throw new ImpossibleError(ctx, "If statement must have a condition expression.");
    }
    if (ctx.block(0) === null) {
      throw new ImpossibleError(ctx, "If statement must have a 'then' block.");
    }
    if (ctx.ELSE() && ctx.block(1) === null && ctx.ifStmt() === null) {
      throw new ImpossibleError(ctx, "If statement with 'else' must have an 'else' block or an 'else if' statement.");
    }
    const condition = ctx.expr();
    if (condition) {
      // Evaluate the condition
      const result = this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== 'boolean') {
        throw new ConditionNotBooleanError(ctx.expr(), result);
      }
      if (result) {
        // Execute the 'then' block
        this.visit(ctx.block(0));
      } else if (ctx.ELSE()) {
        if (ctx.block_list().length == 2) { // Execute the block after else
          // Execute the 'else' block if it exists
          this.visit(ctx.block(1));
        } else if (ctx.ifStmt()) {
          // Execute the ifStmt after else
          this.visit(ctx.ifStmt())
        }
      }
    }
  }

  override visitWhileStmt = (ctx: WhileStmtContext): void => {
    // Validate statement structure
    if (ctx.expr() === null) {
      throw new ImpossibleError(ctx, "While statement must have a condition expression.");
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(ctx, "While statement must have a block to execute.");
    }
    const condition = ctx.expr();
    while (true) {
      const result = this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== 'boolean') {
        throw new ConditionNotBooleanError(ctx.expr(), `Condition must evaluate to a boolean value, got: ${result}`);
      }
      if (!result) {
        break;
      }
      this.visit(ctx.block());
    }
  }

  override visitDoWhileStmt = (ctx: DoWhileStmtContext): void => {
    if (ctx.expr() === null) {
      throw new ImpossibleError(ctx, "Do-While statement must have a condition expression.");
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(ctx, "Do-While statement must have a block to execute.");
    }
    const condition = ctx.expr();
    do {
      this.visit(ctx.block());
      const result = this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== 'boolean') {
        throw new ConditionNotBooleanError(ctx.expr(), `Condition must evaluate to a boolean value, got: ${result}`);
      }
      if (!result) {
        break;
      }
    } while (true);
  }

  override visitRepeatUntilStmt = (ctx: RepeatUntilStmtContext): void => {
    if (ctx.expr() === null) {
      throw new ImpossibleError(ctx, "Do-While statement must have a condition expression.");
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(ctx, "Do-While statement must have a block to execute.");
    }
    const condition = ctx.expr();
    do {
      this.visit(ctx.block());
      const result = this.visit(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== 'boolean') {
        throw new ConditionNotBooleanError(ctx.expr(), `Condition must evaluate to a boolean value, got: ${result}`);
      }
      if (result) {
        break;
      }
    } while (true);
  }

  override visitForStmt = (ctx: ForStmtContext): void => {
    if (ctx.ID() === null) {
      throw new ImpossibleError(ctx, "For statement must have a loop variable.");
    }
    if (ctx.expr(0) === null || ctx.expr(1) === null) {
      throw new ImpossibleError(ctx, "For statement must have both 'from' and 'to' expressions.");
    }
    if (ctx.block() === null) {
      throw new ImpossibleError(ctx, "For statement must have a block to execute.");
    }
    const loopVar = ctx.ID().getText();
    const fromValue = this.visit(ctx.expr(0));
    const toValue = this.visit(ctx.expr(1));
    const isDown = ctx.DOWN() !== null;
    if (this.variableExists(loopVar)) {
      throw new ForVariableReuseError(ctx, loopVar);
    }
    if (typeof fromValue !== 'number' || typeof toValue !== 'number') {
      throw new ForRangeNotNumberError(ctx, `${fromValue} and ${toValue}`);
    }
    for (let i = fromValue; isDown ? i >= toValue : i <= toValue; isDown ? i-- : i++) {
      this.assignVariable(loopVar, i);
      this.visit(ctx.block());
      this.deleteVariable(loopVar);
    }
  }

  override visitAsmStmt = (ctx: AsmStmtContext): void => {
    const varName = ctx.ID().getText();
    const value = this.visit(ctx.expr());
    this.assignVariable(varName, value);
  }

  override visitInputStmt = async (ctx: InputStmtContext): Promise<void> => {
    const varName = ctx.ID().getText();
    const inputValue = await this.options.inputFunction?.();
    this.assignVariable(varName, inputValue.toString());
  }

  override visitOutputStmt = (ctx: OutputStmtContext): void => {
    const val = this.visit(ctx.expr()).toString();
    this.options.outputFunction?.(val);
  }
}

class PSCErrorListener extends ErrorListener<Token> {
  override syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: any): void {
    throw new SyntaxError(`Syntax error at line ${line}, column ${column}: ${msg}`);
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
