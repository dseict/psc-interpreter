import type { ParserRuleContext } from "antlr4"

function generateLineColMessage(ctx: ParserRuleContext) {
  if (ctx.stop && !(ctx.start.line == ctx.stop.line && ctx.start.column == ctx.stop.column)) {
    return `(from ln ${ctx.start.line} col ${ctx.start.column} to ln ${ctx.stop.line} col ${ctx.stop.column})`
  } else {
    return `(at ln ${ctx.start.line} col ${ctx.start.column})`
  }
}

export class AccessNonExistingVariableError extends Error {
  constructor(ctx: ParserRuleContext | undefined, variable: string) {
    super(`Cannot access variable ${variable}, which does not exists. ${ctx && generateLineColMessage(ctx)}`)
  }
}

export class OperationValueTypeMismatchError extends Error {
  constructor(ctx: ParserRuleContext | undefined, operator: string, expectedType: string, got: string) {
    super(`${operator} can only be applied to ${expectedType}, got ${got}. ${ctx && generateLineColMessage(ctx)}`)
  }
}

export class ConditionNotBooleanError extends Error {
  constructor(ctx: ParserRuleContext | undefined, got: string) {
    super(`A condition must be evaluated to a boolean, got ${got}. ${ctx && generateLineColMessage(ctx)}`)
  }
}

export class ForRangeNotNumberError extends Error {
  constructor(ctx: ParserRuleContext | undefined, got: string) {
    super(`For loop range must evaluate to a number, got ${got}. ${ctx && generateLineColMessage(ctx)}`)
  }
}

export class ForVariableReuseError extends Error {
  constructor(ctx: ParserRuleContext | undefined, name: string) {
    super(`Cannot reuse loop variable '${name}' in a for loop. ${ctx && generateLineColMessage(ctx)}`)
  }
}

export class ImpossibleError extends Error {
  constructor(ctx: ParserRuleContext | undefined, message: string) {
    super(`The following error should not be possible. Please report this bug:\n${message}. ${ctx && generateLineColMessage(ctx)}`)
  }
}