import { CharStream, CommonToken, Lexer, Token } from "antlr4";
import PSCLexer from "./antlr/PSCLexer";

export default class PSCLexerBase extends Lexer {
  indents: number[] = [];
  pendingTokens: Token[] = [];

  constructor(input: CharStream) {
    super(input);
  }

  override nextToken(): Token {
    const t = this.pendingTokens.shift() ?? super.nextToken();
    if (this.#onToken(t)) {
      return t;
    } else {
      return this.nextToken();
    }
  }

  // Return true if the token should be emitted, false if it should be skipped
  #onToken(token: Token): boolean {
    // console.log(`token: ${PSCLexer.symbolicNames[token.type]} '${token.text}'\n--`)
    switch (token.type) {
      case PSCLexer.NEWLINE: {
        // NEWLINE token is followed by indentation spacings
        // Get the indentation level of the NEWLINE token
        const indent = this.text.replace(/\r?\n/g, "");
        const indentLevel = calculateIndentation(indent);
        const lastIndentLevel = this.indents[this.indents.length - 1] ?? 0; // if stack is empty, indent level = 0
        if (indentLevel > lastIndentLevel) {
          // Only allow indenting by one level at a time
          if (indentLevel - lastIndentLevel != 1) {
            throw new Error(
              `indentation level changed by more than one: ${lastIndentLevel} -> ${indentLevel} at line ${token.line}`,
            );
          }
          // Emits an INDENT token and push the new indentation level onto the stack
          this.indents.push(indentLevel);
          this.pendingTokens.push(this.#makeToken(PSCLexer.INDENT));
        } else if (indentLevel < lastIndentLevel) {
          // Dedent as many times as needed to return to the original indentation level
          for (let i = 0; i < lastIndentLevel - indentLevel; i++) {
            this.pendingTokens.push(this.#makeToken(PSCLexer.DEDENT));
            this.indents.pop();
          }
        }
        return true;
      }
      case PSCLexer.EOF: {
        // If no more dedent needed, EOF gracefully
        if (this.indents.length == 0) {
          return true;
        }
        // Otherwise, dedent as many times as needed
        while (this.indents.pop() !== undefined) {
          this.pendingTokens.push(this.#makeToken(PSCLexer.DEDENT));
        }
        this.pendingTokens.push(token); // Push the EOF token to the pending tokens
        return false; // Skip the current EOF token
      }
    }
    return true;
  }

  #makeToken(type: number): Token {
    const text = `<${PSCLexer.symbolicNames[type] ?? "UNKNOWN"}>`;
    const token = new CommonToken(
      [this, this._input],
      type,
      Token.DEFAULT_CHANNEL,
      this._tokenStartCharIndex,
      this._tokenStartCharIndex + text.length - 1,
    );
    token.text = text;
    return token;
  }
}

function calculateIndentation(whitespace: string): number {
  let level = 0;
  for (let i = 0; i < whitespace.length; i++) {
    switch (whitespace[i]) {
      case " ":
        if (whitespace[i + 1] === " ") {
          i++;
          level++;
        } else {
          throw new Error(
            `expected two consecutive spaces for indentation, but found one at index ${i}`,
          );
        }
        break;
      case "\t":
        level++;
        break;
      default:
        throw new Error(`indentation invalid`);
    }
  }
  return level;
}
