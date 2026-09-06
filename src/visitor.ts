import type { ParserRuleContext } from "antlr4";
import type {
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
  ReturnStmtContext,
  StmtContext,
  StmtsContext,
  SubprogramContext,
  UnaryExprContext,
  WhileStmtContext,
} from "./_antlr/PSCParser";
import PSCParser from "./_antlr/PSCParser";
import PSCParserVisitor from "./_antlr/PSCParserVisitor";
import {
  PSCAccessNonExistingVariableError,
  PSCArrayAccessNotArrayError,
  PSCConditionNotBooleanError,
  PSCForRangeNotIntegerError,
  PSCForVariableReuseError,
  PSCImpossibleError,
  PSCInvalidArrayIndexError,
  PSCOperationValueTypeMismatchError,
  PSCUnmatchedArgumentsError,
} from "./error";
import {
  PSCEventBus,
  type PSCEventCallback,
  type PSCEventType,
} from "./events";
import { resolveSequentially } from "./utils";

export type PSCVisitorOptions = {
  strictVariableScope: boolean;
  arrayStartIndex: number;
  outputFunction?: (output: string) => void;
  inputFunction?: () => Promise<string>;
};

export type PSCSubprogram = (params: PSCTypes[]) => Promise<PSCTypes>;

export type PSCTypes =
  string | number | boolean | PSCTypes[] | null | PSCSubprogram | undefined;

export class PSCInterpretVisitor extends PSCParserVisitor<
  Promise<PSCTypes | Ref | void>
> {
  #options: PSCVisitorOptions;
  // Stack of variable scopes
  #variableStack: Record<string, PSCTypes>[] = [{}];
  // Current return value, undefined means currently not in returning state
  #currentReturn: PSCTypes | undefined = undefined;
  // Event bus
  #eventBus: PSCEventBus = new PSCEventBus();

  constructor(options: PSCVisitorOptions) {
    super();
    this.#options = options;
  }

  // Returns a function that can be called to unregister the event handler
  on<T extends PSCEventType>(
    eventType: T,
    handler: PSCEventCallback<T>,
  ): () => void {
    return this.#eventBus.on(eventType, handler);
  }

  getMutableVariableStack() {
    return this.#variableStack;
  }

  #stringSmartCast(value: PSCTypes): PSCTypes {
    if (typeof value === "string") {
      // Try to cast to boolean
      if (value.toLowerCase() === "true") {
        return true;
      }
      if (value.toLowerCase() === "false") {
        return false;
      }
      if (value.toLowerCase() === "null") {
        return null;
      }
      // Handle ridiculous edge cases for JS built-in casting v_v
      if (value.trim() === "" || !/^-?\d*(\.\d+)?$/.test(value)) {
        return value; // Return as is
      }
      // Try to cast to number
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        return numValue;
      }
    }
    return value; // Return as is if no casting is possible
  }

  #assignVariable(
    _ctx: ParserRuleContext,
    name: string,
    value: PSCTypes,
  ): void {
    // Found if the variable is declared, and reassign it in the correct scope
    for (const stack of this.#variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        stack[name] = value;
        return;
      }
    }
    // If variable not found declared, assign it to the current scope
    this.#variableStack[this.#variableStack.length - 1]![name] = value;
  }

  #readVariable(ctx: ParserRuleContext, name: string): PSCTypes {
    for (const stack of this.#variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        return stack[name];
      }
    }

    throw new PSCAccessNonExistingVariableError(ctx, name);
  }

  #deleteVariable(ctx: ParserRuleContext, name: string): void {
    for (const stack of this.#variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        delete stack[name];
        return;
      }
    }
    throw new PSCImpossibleError(
      ctx,
      `Cannot delete variable '${name}' because it does not exist.`,
    );
  }

  #variableExists(name: string): boolean {
    for (const stack of this.#variableStack.slice().reverse()) {
      if (stack[name] !== undefined) {
        return true;
      }
    }
    return false;
  }

  #newVariableStack(_ctx: ParserRuleContext): void {
    this.#variableStack.push({});
  }

  #popVariableStack(ctx: ParserRuleContext): void {
    if (this.#variableStack.length === 1) {
      throw new PSCImpossibleError(
        ctx,
        "Cannot pop the global variable stack.",
      );
    }
    this.#variableStack.pop();
  }

  #initiateReturn(value: PSCTypes): void {
    this.#currentReturn = value;
  }

  #isReturning(): boolean {
    return this.#currentReturn !== undefined;
  }

  #terminateReturn(): PSCTypes {
    const ret = this.#currentReturn;
    this.#currentReturn = undefined;
    return ret;
  }

  #asString(ctx: ParserRuleContext, value: PSCTypes): string {
    if (Array.isArray(value)) {
      return `[${value.map((v) => this.#asString(ctx, v)).join(",")}]`;
    } else if (typeof value === "boolean") {
      return value ? "true" : "false";
    } else if (typeof value === "number") {
      return value.toString();
    } else if (typeof value === "string") {
      return `"` + value + `"`; // Wrap string in quotes
    } else if (value === undefined) {
      return "";
    } else if (value === null) {
      return "null";
    } else if (value instanceof Function) {
      return "[Function]";
    }
    throw new PSCImpossibleError(
      ctx,
      `Cannot convert value of type ${typeof value} to string.`,
    );
  }

  #normalizeArrayIndexOrThrow(ctx: ParserRuleContext, index: PSCTypes): number {
    if (
      typeof index !== "number" ||
      !Number.isInteger(index - this.#options.arrayStartIndex) ||
      index - this.#options.arrayStartIndex < 0
    ) {
      throw new PSCInvalidArrayIndexError(ctx, this.#asString(ctx, index));
    }
    return index - this.#options.arrayStartIndex;
  }

  override visitProgram = async (ctx: ProgramContext): Promise<void> => {
    for (const subprogramCtx of ctx.subprogram_list()) {
      await this.visitSubprogram(subprogramCtx);
    }
    if (ctx.stmts() != null) {
      await this.visitStmts(ctx.stmts());
    }
  };

  // Expression and literals
  override visitExpr = async (ctx: ExprContext): Promise<PSCTypes> => {
    const eventParams = {
      startLine: ctx.start.line,
      startCol: ctx.start.column,
      endLine: ctx.stop?.line,
      endCol:
        ctx.stop !== undefined
          ? ctx.stop.column + ctx.stop.stop - ctx.stop.start
          : undefined,
      expr: ctx.getText(),
    };
    await this.#eventBus.emit("pre_eval_expr", { ...eventParams });
    const result = await this.visitOrExpr(ctx.orExpr());
    await this.#eventBus.emit("post_eval_expr", { ...eventParams, result });
    return result;
  };

  override visitOrExpr = async (ctx: OrExprContext): Promise<PSCTypes> => {
    let result = this.#stringSmartCast(await this.visitAndExpr(ctx.andExpr(0)));
    for (let i = 1; i < ctx.andExpr_list().length; i++) {
      const right = this.#stringSmartCast(
        await this.visitAndExpr(ctx.andExpr(i)),
      );
      const resultBool = typeof result == "boolean";
      const rightBool = typeof right == "boolean";
      if (!resultBool || !rightBool) {
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "OR",
          "boolean",
          this.#asString(ctx, !resultBool ? result : right),
        );
      }
      result = result || right;
    }
    return result;
  };

  override visitAndExpr = async (ctx: AndExprContext): Promise<PSCTypes> => {
    let result = this.#stringSmartCast(
      await this.visitCompExpr(ctx.compExpr(0)),
    );
    for (let i = 1; i < ctx.compExpr_list().length; i++) {
      const right = this.#stringSmartCast(
        await this.visitCompExpr(ctx.compExpr(i)),
      );
      const resultBool = typeof result == "boolean";
      const rightBool = typeof right == "boolean";
      if (!resultBool || !rightBool) {
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "AND",
          "boolean",
          this.#asString(ctx, !resultBool ? result : right),
        );
      }

      result = result && right;
    }
    return result;
  };

  override visitCompExpr = async (ctx: CompExprContext): Promise<PSCTypes> => {
    let result = this.#stringSmartCast(await this.visitAddExpr(ctx.addExpr(0)));
    for (let i = 1; i < ctx.addExpr_list().length; i++) {
      const right = this.#stringSmartCast(
        await this.visitAddExpr(ctx.addExpr(i)),
      );
      const operator = ctx.compOp(i - 1).getText();
      switch (operator) {
        case "=":
          result = result === right;
          break;
        case "<>":
          result = result !== right;
          break;
        case ">":
          if (
            (typeof result == "string" && typeof right == "string") ||
            (typeof result == "number" && typeof right == "number")
          ) {
            result = result > right;
          } else {
            throw new PSCOperationValueTypeMismatchError(
              ctx,
              ">",
              "string or number",
              `${result} > ${right}`,
            );
          }
          break;
        case "<":
          if (
            (typeof result == "string" && typeof right == "string") ||
            (typeof result == "number" && typeof right == "number")
          ) {
            result = result < right;
          } else {
            throw new PSCOperationValueTypeMismatchError(
              ctx,
              "<",
              "string or number",
              `${result} < ${right}`,
            );
          }
          break;
        case ">=":
          if (
            (typeof result == "string" && typeof right == "string") ||
            (typeof result == "number" && typeof right == "number")
          ) {
            result = result >= right;
          } else {
            throw new PSCOperationValueTypeMismatchError(
              ctx,
              ">=",
              "string or number",
              `${result} >= ${right}`,
            );
          }
          break;
        case "<=":
          if (
            (typeof result == "string" && typeof right == "string") ||
            (typeof result == "number" && typeof right == "number")
          ) {
            result = result <= right;
          } else {
            throw new PSCOperationValueTypeMismatchError(
              ctx,
              "<=",
              "string or number",
              `${result} <= ${right}`,
            );
          }
          break;
        default:
          throw new PSCImpossibleError(
            ctx,
            `Unknown comparison operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitAddExpr = async (ctx: AddExprContext): Promise<PSCTypes> => {
    let result = this.#stringSmartCast(await this.visitMulExpr(ctx.mulExpr(0)));
    for (let i = 1; i < ctx.mulExpr_list().length; i++) {
      const right = this.#stringSmartCast(
        await this.visitMulExpr(ctx.mulExpr(i)),
      );
      if (typeof result !== "number" || typeof right !== "number") {
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "Addition or subtraction",
          "number",
          `${this.#asString(ctx, result)} and ${this.#asString(ctx, right)}`,
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
          throw new PSCImpossibleError(
            ctx,
            `Unknown addition/subtraction operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitMulExpr = async (ctx: MulExprContext): Promise<PSCTypes> => {
    let result = this.#stringSmartCast(await this.visitExpExpr(ctx.expExpr(0)));
    for (let i = 1; i < ctx.expExpr_list().length; i++) {
      const right = this.#stringSmartCast(
        await this.visitExpExpr(ctx.expExpr(i)),
      );
      if (typeof result !== "number" || typeof right !== "number") {
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "Multiplication/division/modulo",
          "number",
          `${this.#asString(ctx, result)} and ${this.#asString(ctx, right)}`,
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
        case "mod":
        case "%":
          result %= right;
          break;
        default:
          throw new PSCImpossibleError(
            ctx,
            `Unknown multiplication operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitExpExpr = async (ctx: ExpExprContext): Promise<PSCTypes> => {
    let result = await this.visitUnaryExpr(ctx.unaryExpr(0));
    for (let i = 1; i < ctx.unaryExpr_list().length; i++) {
      const right = this.#stringSmartCast(
        await this.visitUnaryExpr(ctx.unaryExpr(i)),
      );
      if (typeof result !== "number" || typeof right !== "number") {
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "Exponential",
          "number",
          `${this.#asString(ctx, result)} and ${this.#asString(ctx, right)}`,
        );
      }
      const operator = ctx.expOp(i - 1).getText();
      switch (operator) {
        case "**":
        case "^":
          result **= right;
          break;
        default:
          throw new PSCImpossibleError(
            ctx,
            `Unknown exponentiation operator: ${operator}`,
          );
      }
    }
    return result;
  };

  override visitUnaryExpr = async (
    ctx: UnaryExprContext,
  ): Promise<PSCTypes> => {
    const minusCount = ctx.MINUS_list().length;
    const plusCount = ctx.PLUS_list().length;
    const value = this.#stringSmartCast(await this.visitNotExpr(ctx.notExpr()));

    if (typeof value !== "number" && (minusCount > 0 || plusCount > 0)) {
      throw new PSCOperationValueTypeMismatchError(
        ctx,
        "Unary negation/affirmation operator",
        "number",
        this.#asString(ctx, value),
      );
    }
    if (minusCount % 2 === 0) {
      return value;
    } else {
      if (typeof value !== "number") {
        // This should never happen, just for type safety
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "Negative sign operator",
          "number",
          this.#asString(ctx, value),
        );
      } else {
        return -value;
      }
    }
  };

  override visitNotExpr = async (ctx: NotExprContext): Promise<PSCTypes> => {
    const notCount = ctx.NOT_list().length;
    const value = this.#stringSmartCast(
      await this.visitPrimaryExpr(ctx.primaryExpr()),
    );
    if (typeof value !== "boolean" && notCount > 0) {
      throw new PSCOperationValueTypeMismatchError(
        ctx,
        "NOT",
        "boolean",
        this.#asString(ctx, value),
      );
    }
    if (notCount % 2 === 0) {
      return value;
    } else {
      if (typeof value !== "boolean") {
        // This should never happen, just for type safety
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "NOT",
          "boolean",
          this.#asString(ctx, value),
        );
      }
      return !value;
    }
  };

  override visitPrimaryExpr = async (
    ctx: PrimaryExprContext,
  ): Promise<PSCTypes> => {
    if (ctx.LPAREN() && ctx.RPAREN()) {
      const args = await resolveSequentially(
        ctx.expr_list().map((expr) => () => this.visitExpr(expr)),
      );
      const func = await this.visitPrimaryExpr(ctx.primaryExpr());
      if (typeof func !== "function") {
        throw new PSCOperationValueTypeMismatchError(
          ctx,
          "Function call",
          "function",
          this.#asString(ctx, func),
        );
      }
      // Function must return a value
      return await func(args);
    } else if (ctx.LSQUARE() && ctx.RSQUARE()) {
      const indices = await resolveSequentially(
        ctx.expr_list().map((expr) => () => this.visitExpr(expr)),
      );
      const leftArr = await this.visitPrimaryExpr(ctx.primaryExpr());
      return indices.reduce((arr: PSCTypes, index: PSCTypes) => {
        if (!Array.isArray(arr)) {
          throw new PSCArrayAccessNotArrayError(ctx, this.#asString(ctx, arr));
        }
        const normalizedIndex = this.#normalizeArrayIndexOrThrow(ctx, index);
        if (normalizedIndex > arr.length - 1) {
          throw new PSCInvalidArrayIndexError(ctx, this.#asString(ctx, index));
        }
        return arr[normalizedIndex];
      }, leftArr);
    } else if (ctx.groupExpr()) {
      return await this.visitGroupExpr(ctx.groupExpr());
    }
    throw new PSCImpossibleError(ctx, "Invalid primary");
  };

  override visitGroupExpr = async (
    ctx: GroupExprContext,
  ): Promise<PSCTypes> => {
    if (ctx.expr()) {
      return await this.visitExpr(ctx.expr());
    } else if (ctx.atom()) {
      return await this.visitAtom(ctx.atom());
    }
    throw new PSCImpossibleError(ctx, "Invalid group expression");
  };

  override visitAtom = async (ctx: AtomContext): Promise<PSCTypes> => {
    if (ctx.lits()) {
      return await this.visitLits(ctx.lits());
    } else if (ctx.ID()) {
      // Handle variable lookup here
      return this.#readVariable(ctx, ctx.ID().getText());
    }
    throw new PSCImpossibleError(ctx, "Invalid atom");
  };

  override visitLits = async (ctx: LitsContext): Promise<PSCTypes> => {
    if (ctx.floatLits()) {
      return await this.visitFloatLits(ctx.floatLits());
    } else if (ctx.intLits()) {
      return await this.visitIntLits(ctx.intLits());
    } else if (ctx.arrayLits()) {
      return await this.visitArrayLits(ctx.arrayLits());
    } else if (ctx.STRING()) {
      return this.#stringSmartCast(ctx.STRING().getText().slice(1, -1)); // Remove quotes
    } else if (ctx.BOOLEAN()) {
      return ctx.BOOLEAN().getText().toLowerCase() === "true";
    } else if (ctx.NULL()) {
      return null;
    }
    throw new PSCImpossibleError(ctx, "Invalid literal");
  };

  override visitIntLits = async (ctx: IntLitsContext): Promise<number> => {
    const sign = ctx.MINUS() !== null ? -1 : 1;
    return parseInt(ctx.INTEGER().getText(), 10) * sign;
  };

  override visitFloatLits = async (ctx: FloatLitsContext): Promise<number> => {
    const sign = ctx.MINUS() !== null ? -1 : 1;
    return parseFloat(ctx.FLOAT().getText()) * sign;
  };

  override visitArrayLits = async (
    ctx: ArrayLitsContext,
  ): Promise<PSCTypes[]> => {
    const elements: PSCTypes[] = [];
    if (ctx.expr_list()) {
      for (const expr of ctx.expr_list()) {
        elements.push(await this.visitExpr(expr));
      }
    }
    return elements;
  };

  override visitStmts = async (ctx: StmtsContext): Promise<void> => {
    for (const stmt of ctx.stmt_list()) {
      await this.visitStmt(stmt);
      if (this.#isReturning()) {
        // If a return statement was executed, stop executing further statements
        break;
      }
    }
  };

  override visitStmt = async (ctx: StmtContext): Promise<void> => {
    if (
      ctx.children == null ||
      ctx.children.length != 1 ||
      ctx.children[0] == null
    )
      throw new PSCImpossibleError(
        ctx,
        "Statement must have exactly one child",
      );

    const child = ctx.children[0] as ParserRuleContext;
    let ruleIndex;
    try {
      ruleIndex = (child as unknown as { ruleIndex: number }).ruleIndex;
    } catch (e) {
      throw new PSCImpossibleError(
        ctx,
        `Failed to get ruleIndex from child: ${e}`,
      );
    }
    const ruleName = PSCParser.ruleNames[ruleIndex];
    if (!ruleName) {
      throw new PSCImpossibleError(
        ctx,
        `Undefined rule name. ruleIndex ${ruleIndex} constructor.name ${child.constructor.name}`,
      );
    }
    const eventParams = {
      startLine: child.start.line,
      startCol: child.start.column,
      endLine: child.stop?.line,
      endCol:
        child.stop !== undefined
          ? child.stop.column + child.stop.stop - child.stop.start
          : undefined,
      stmtType: ruleName,
    };
    await this.#eventBus.emit("pre_exec_stmt", { ...eventParams });

    // Dispatch appropriate visit method
    await this.visit(ctx.children[0] as ParserRuleContext);

    await this.#eventBus.emit("post_exec_stmt", { ...eventParams });
  };

  override visitBlock = async (ctx: BlockContext): Promise<void> => {
    if (this.#options.strictVariableScope) {
      this.#newVariableStack(ctx);
    }
    await this.visitStmts(ctx.stmts());
    if (this.#options.strictVariableScope) {
      this.#popVariableStack(ctx);
    }
  };

  override visitIfStmt = async (ctx: IfStmtContext): Promise<void> => {
    // Validate statement structure
    if (ctx.expr() === null) {
      throw new PSCImpossibleError(
        ctx,
        "If statement must have a condition expression.",
      );
    }
    if (ctx.block(0) === null) {
      throw new PSCImpossibleError(
        ctx,
        "If statement must have a 'then' block.",
      );
    }
    if (ctx.ELSE() && ctx.block(1) === null && ctx.ifStmt() === null) {
      throw new PSCImpossibleError(
        ctx,
        "If statement with 'else' must have an 'else' block or an 'else if' statement.",
      );
    }
    const condition = ctx.expr();

    const eventParams = {
      startLine: ctx.IF().symbol.line,
      startCol: ctx.IF().symbol.column,
      endLine: condition.stop?.line,
      endCol:
        condition.stop !== undefined
          ? condition.stop.column + condition.stop.stop - condition.stop.start
          : undefined,
    };
    await this.#eventBus.emit("pre_if_condition", { ...eventParams });
    // Evaluate the condition
    const result = await this.visitExpr(condition);

    // Ensure the result is evaluated to a boolean value
    if (typeof result !== "boolean") {
      throw new PSCConditionNotBooleanError(
        ctx.expr(),
        this.#asString(ctx, result),
      );
    }
    await this.#eventBus.emit("post_if_condition", {
      ...eventParams,
      result,
    });
    if (result) {
      // Execute the 'then' block
      await this.visitBlock(ctx.block(0));
    } else if (ctx.ELSE()) {
      if (ctx.block_list().length == 2) {
        // Execute the block after else
        // Execute the 'else' block if it exists
        await this.visitBlock(ctx.block(1));
      } else if (ctx.ifStmt()) {
        // Execute the ifStmt after else
        await this.visitIfStmt(ctx.ifStmt());
      }
    }
  };

  override visitWhileStmt = async (ctx: WhileStmtContext): Promise<void> => {
    // Validate statement structure
    if (ctx.expr() === null) {
      throw new PSCImpossibleError(
        ctx,
        "While statement must have a condition expression.",
      );
    }
    if (ctx.block() === null) {
      throw new PSCImpossibleError(
        ctx,
        "While statement must have a block to execute.",
      );
    }
    const condition = ctx.expr();
    while (true) {
      const eventParams = {
        startLine: ctx.WHILE().symbol.line,
        startCol: ctx.WHILE().symbol.column,
        endLine: condition.stop?.line,
        endCol:
          condition.stop !== undefined
            ? condition.stop.column + condition.stop.stop - condition.stop.start
            : undefined,
      };
      await this.#eventBus.emit("pre_while_condition", { ...eventParams });
      const result = await this.visitExpr(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new PSCConditionNotBooleanError(
          ctx.expr(),
          `Condition must evaluate to a boolean value, got: ${result}`,
        );
      }
      await this.#eventBus.emit("post_while_condition", {
        ...eventParams,
        shouldContinue: result,
      });
      if (!result) {
        break;
      }
      await this.visitBlock(ctx.block());
    }
  };

  override visitDoWhileStmt = async (
    ctx: DoWhileStmtContext,
  ): Promise<void> => {
    if (ctx.expr() === null) {
      throw new PSCImpossibleError(
        ctx,
        "Do-While statement must have a condition expression.",
      );
    }
    if (ctx.block() === null) {
      throw new PSCImpossibleError(
        ctx,
        "Do-While statement must have a block to execute.",
      );
    }
    const condition = ctx.expr();
    let result;
    do {
      await this.visitBlock(ctx.block());

      const eventParams = {
        startLine: ctx.WHILE().symbol.line,
        startCol: ctx.WHILE().symbol.column,
        endLine: condition.stop?.line,
        endCol:
          condition.stop !== undefined
            ? condition.stop.column + condition.stop.stop - condition.stop.start
            : undefined,
      };
      await this.#eventBus.emit("pre_do_while_condition", { ...eventParams });
      result = await this.visitExpr(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new PSCConditionNotBooleanError(
          ctx.expr(),
          `Condition must evaluate to a boolean value, got: ${result}`,
        );
      }
      await this.#eventBus.emit("post_do_while_condition", {
        ...eventParams,
        shouldContinue: result,
      });
    } while (result);
  };

  override visitRepeatUntilStmt = async (
    ctx: RepeatUntilStmtContext,
  ): Promise<void> => {
    if (ctx.expr() === null) {
      throw new PSCImpossibleError(
        ctx,
        "Do-While statement must have a condition expression.",
      );
    }
    if (ctx.block() === null) {
      throw new PSCImpossibleError(
        ctx,
        "Do-While statement must have a block to execute.",
      );
    }
    const condition = ctx.expr();
    let result;
    do {
      await this.visitBlock(ctx.block());
      const eventParams = {
        startLine: ctx.UNTIL().symbol.line,
        startCol: ctx.UNTIL().symbol.column,
        endLine: condition.stop?.line,
        endCol:
          condition.stop !== undefined
            ? condition.stop.column + condition.stop.stop - condition.stop.start
            : undefined,
      };
      await this.#eventBus.emit("pre_repeat_until_condition", {
        ...eventParams,
      });
      result = await this.visitExpr(condition);
      // Ensure the result is evaluated to a boolean value
      if (typeof result !== "boolean") {
        throw new PSCConditionNotBooleanError(
          ctx.expr(),
          `Condition must evaluate to a boolean value, got: ${result}`,
        );
      }
      await this.#eventBus.emit("post_repeat_until_condition", {
        ...eventParams,
        shouldContinue: !result,
      });
    } while (!result);
  };

  override visitForStmt = async (ctx: ForStmtContext): Promise<void> => {
    if (ctx.ID() === null) {
      throw new PSCImpossibleError(
        ctx,
        "For statement must have a loop variable.",
      );
    }
    if (ctx.expr(0) === null || ctx.expr(1) === null) {
      throw new PSCImpossibleError(
        ctx,
        "For statement must have both 'from' and 'to' expressions.",
      );
    }
    if (ctx.block() === null) {
      throw new PSCImpossibleError(
        ctx,
        "For statement must have a block to execute.",
      );
    }
    const loopVar = ctx.ID().getText();
    const fromExpr = ctx.expr(0);
    const toExpr = ctx.expr(1);
    const fromValue = await this.visitExpr(fromExpr);
    const toValue = await this.visitExpr(toExpr);
    const isDown = ctx.DOWN() !== null;
    if (this.#variableExists(loopVar)) {
      throw new PSCForVariableReuseError(ctx, loopVar);
    }
    if (
      typeof fromValue !== "number" ||
      typeof toValue !== "number" ||
      !Number.isInteger(fromValue) ||
      !Number.isInteger(toValue)
    ) {
      throw new PSCForRangeNotIntegerError(ctx, `${fromValue} and ${toValue}`);
    }
    let oldValue: number | undefined = undefined;
    for (
      let i = fromValue;
      isDown ? i >= toValue : i <= toValue;
      isDown ? i-- : i++
    ) {
      await this.#eventBus.emit("for_variable_change", {
        startLine: ctx.FOR().symbol.line,
        startCol: ctx.FOR().symbol.column,
        endLine: toExpr.stop?.line,
        endCol:
          toExpr.stop !== undefined
            ? toExpr.stop.column + toExpr.stop.stop - toExpr.stop.start
            : undefined,
        variableName: loopVar,
        oldValue: oldValue,
        newValue: i,
      });
      this.#assignVariable(ctx, loopVar, i);
      await this.visitBlock(ctx.block());
      this.#deleteVariable(ctx, loopVar);
      oldValue = i;
    }
  };

  override visitAsmStmt = async (ctx: AsmStmtContext): Promise<void> => {
    const ref = await this.visitLvalue(ctx.lvalue());
    const value = await this.visitExpr(ctx.expr());
    ref.set(value);
  };

  override visitLvalue = async (ctx: LvalueContext): Promise<Ref> => {
    if (ctx.ID()) {
      const varName = ctx.ID().getText();
      return {
        get: () =>
          this.#variableExists(varName)
            ? this.#readVariable(ctx, varName)
            : undefined,
        set: (value: PSCTypes) => this.#assignVariable(ctx, varName, value),
      };
    } else if (ctx.lvalue() && ctx.LSQUARE() && ctx.RSQUARE()) {
      const leftRef = await this.visitLvalue(ctx.lvalue());
      const leftVal = leftRef.get();
      const unnormalizedIndices = await resolveSequentially(
        ctx.expr_list().map((expr) => () => this.visitExpr(expr)),
      );

      return {
        get: () => {
          // In lvalue array access, since we allow implicit array creation,
          // if leftVal is undefined, we return undefined instead of throwing.
          if (leftVal === undefined) {
            return undefined;
          }

          let current: PSCTypes = leftVal;
          for (const unnormalizedIndex of unnormalizedIndices) {
            if (!Array.isArray(current)) {
              throw new PSCArrayAccessNotArrayError(
                ctx,
                this.#asString(ctx, current),
              );
            }
            const normalizedIndex = this.#normalizeArrayIndexOrThrow(
              ctx,
              unnormalizedIndex,
            );
            // Since we allow implicit array extension,
            // if the index is out of bounds, we return undefined instead of throwing.
            if (normalizedIndex >= current.length) {
              return undefined;
            }
            current = current[normalizedIndex];
          }
          return current;
        },
        set: (value: PSCTypes) => {
          const arr = leftVal != undefined ? leftVal : [];
          if (!Array.isArray(arr)) {
            throw new PSCArrayAccessNotArrayError(
              ctx,
              this.#asString(ctx, arr),
            );
          }

          // Walk to the parent of the final index, creating intermediate arrays as needed
          let current: PSCTypes[] = arr;
          for (let i = 0; i < unnormalizedIndices.length - 1; i++) {
            const normalizedIndex = this.#normalizeArrayIndexOrThrow(
              ctx,
              unnormalizedIndices[i],
            );
            // Implicit extension of the array if the index is out of bounds
            while (current.length <= normalizedIndex) {
              current.push(undefined);
            }
            if (current[normalizedIndex] === undefined) {
              current[normalizedIndex] = [];
            }
            if (!Array.isArray(current[normalizedIndex])) {
              throw new PSCArrayAccessNotArrayError(
                ctx,
                this.#asString(ctx, current[normalizedIndex]),
              );
            }
            current = current[normalizedIndex];
          }

          // Set the final index
          const lastNormalizedIndex = this.#normalizeArrayIndexOrThrow(
            ctx,
            unnormalizedIndices[unnormalizedIndices.length - 1],
          );
          while (current.length <= lastNormalizedIndex) {
            current.push(undefined);
          }
          current[lastNormalizedIndex] = value;

          leftRef.set(arr);
        },
      };
    }
    throw new PSCImpossibleError(ctx, "Invalid assignment left-hand side.");
  };

  override visitInputStmt = async (ctx: InputStmtContext): Promise<void> => {
    const ref = await this.visitLvalue(ctx.lvalue());
    const value = this.#stringSmartCast(await this.#options.inputFunction?.());
    ref.set(value);
  };

  override visitOutputStmt = async (ctx: OutputStmtContext): Promise<void> => {
    const val = this.#asString(ctx, await this.visitExpr(ctx.expr()));
    this.#options.outputFunction?.(val);
  };

  override visitSubprogram = async (ctx: SubprogramContext): Promise<void> => {
    const name = ctx.ID(0).getText();
    const paramNames =
      ctx
        .ID_list()
        ?.slice(1, ctx.ID_list().length)
        .map((id) => id.getText()) ?? [];

    // Subprogram is stored as a variable in the current variable stack
    this.#assignVariable(ctx, name, async (params: PSCTypes[]) => {
      if (params.length !== paramNames.length) {
        throw new PSCUnmatchedArgumentsError(
          ctx,
          name,
          paramNames.length,
          params.length,
        );
      }
      // Create a new variable stack for the subprogram execution ignoring strictVariableScope option.
      // This ensures that variables defined within the subprogram do not interfere with those in the calling context.

      // If strictVariableScope is true, there is no need to create a new variable stack here
      // since that is automatically handled by the visitBlock method
      if (!this.#options.strictVariableScope) {
        this.#newVariableStack(ctx);
      }
      // Assign arguments to the new variable stack
      for (let i = 0; i < paramNames.length; i++) {
        this.#assignVariable(ctx, paramNames[i]!, params[i]!);
      }
      await this.visitBlock(ctx.block());
      if (!this.#options.strictVariableScope) {
        this.#popVariableStack(ctx);
      }
      // Terminate the returning state here

      return this.#terminateReturn() ?? null;
    });
  };

  override visitReturnStmt = async (ctx: ReturnStmtContext): Promise<void> => {
    const value = await this.visitExpr(ctx.expr());
    this.#initiateReturn(value);
  };
}

type Ref<T = PSCTypes> = {
  get: () => T;
  set: (value: T) => void;
};
