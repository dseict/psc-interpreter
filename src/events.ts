import type { PSCTypes } from "./visitor";

export interface PSCEventParams {
  startLine: number;
  startCol: number;
  endLine?: number;
  endCol?: number;
}

export interface PreExecStmtParams extends PSCEventParams {
  stmtType: string;
}

export interface PostExecStmtParams extends PSCEventParams {
  stmtType: string;
}

export type PreWhileConditionParams = PSCEventParams;

export interface PostWhileConditionParams extends PSCEventParams {
  shouldContinue: boolean;
}

export type PreDoWhileConditionParams = PSCEventParams;

export interface PostDoWhileConditionParams extends PSCEventParams {
  shouldContinue: boolean;
}

export type PreRepeatUntilConditionParams = PSCEventParams;

export interface PostRepeatUntilConditionParams extends PSCEventParams {
  shouldContinue: boolean;
}

export interface ForVariableChangeParams extends PSCEventParams {
  variableName: string;
  oldValue?: number;
  newValue: number;
}

export type PreEvalExprParams = PSCEventParams;

export interface PostEvalExprParams extends PSCEventParams {
  result: PSCTypes;
}

type PSCEventParamsMap = {
  pre_exec_stmt: PreExecStmtParams;
  post_exec_stmt: PostExecStmtParams;
  pre_while_condition: PreWhileConditionParams;
  post_while_condition: PostWhileConditionParams;
  pre_do_while_condition: PreDoWhileConditionParams;
  post_do_while_condition: PostDoWhileConditionParams;
  pre_repeat_until_condition: PreRepeatUntilConditionParams;
  post_repeat_until_condition: PostRepeatUntilConditionParams;
  for_variable_change: ForVariableChangeParams;
  pre_eval_expr: PreEvalExprParams;
  post_eval_expr: PostEvalExprParams;
};

export type PSCEventType = keyof PSCEventParamsMap;

export type PSCEventCallback<T extends PSCEventType = PSCEventType> = (
  params: PSCEventParamsMap[T],
) => Promise<void> | void;

export class PSCEventBus {
  #handlers: {
    [K in PSCEventType]?: Set<PSCEventCallback<K>>;
  } = {};

  on<T extends PSCEventType>(
    eventType: T,
    handler: PSCEventCallback<T>,
  ): () => void {
    let set = this.#handlers[eventType];
    if (set === undefined) {
      set = this.#handlers[eventType] = new Set<PSCEventCallback>();
    }
    set.add(handler);
    return () => {
      set?.delete(handler);
    };
  }

  async emit<T extends PSCEventType>(
    eventType: T,
    params: PSCEventParamsMap[T],
  ): Promise<void> {
    const handlers = this.#handlers[eventType];
    if (handlers) {
      for (const handler of handlers) {
        await handler(params);
      }
    }
  }
}
