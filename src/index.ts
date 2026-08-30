import { CharStream, CommonTokenStream, ErrorListener, Token } from "antlr4";
import PSCLexer from "./_antlr/PSCLexer";
import PSCParser from "./_antlr/PSCParser";
import { PSCInterpretVisitor, type PSCVisitorOptions } from "./visitor";
import { PSCSyntaxError } from "./error";
import type { PSCEventCallback, PSCEventType } from "./events";

export class PSCInterpreter {
  #visitor: PSCInterpretVisitor;

  constructor(options?: Partial<PSCVisitorOptions>) {
    this.#visitor = new PSCInterpretVisitor({
      strictVariableScope: false,
      arrayStartIndex: 1,
      ...options, // Override default options with user-provided options
    });
  }

  async interpret(code: string): Promise<void> {
    // Parse the code
    const lexer = new PSCLexer(new CharStream(code));
    lexer.removeErrorListeners();
    lexer.addErrorListener(new PSCErrorListener());
    const parser = new PSCParser(new CommonTokenStream(lexer));
    parser.removeErrorListeners(); // Remove default error listeners
    parser.addErrorListener(new PSCErrorListener());
    const tree = parser.program();
    await this.#visitor.visit(tree);
  }

  on(eventType: PSCEventType, handler: PSCEventCallback): void {
    this.#visitor.on(eventType, handler);
  }
}

class PSCErrorListener extends ErrorListener<Token> {
  override syntaxError(
    recognizer: never,
    offendingSymbol: never,
    line: number,
    column: number,
    msg: string,
  ): void {
    throw new PSCSyntaxError(line, column, msg);
  }
}
