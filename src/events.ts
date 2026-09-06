import type { PSCTypes } from "./visitor";

export type PSCEventParams = {
  startLine: number;
  startCol: number;
  endLine?: number;
  endCol?: number;
};

export type PreExecStmtParams = PSCEventParams & {
  stmtType: string;
};

export type PostExecStmtParams = PSCEventParams & {
  stmtType: string;
};

export type PreWhileConditionParams = PSCEventParams;

export type PostWhileConditionParams = PSCEventParams & {
  shouldContinue: boolean;
};

export type PreDoWhileConditionParams = PSCEventParams;

export type PostDoWhileConditionParams = PSCEventParams & {
  shouldContinue: boolean;
};

export type PreRepeatUntilConditionParams = PSCEventParams;

export type PostRepeatUntilConditionParams = PSCEventParams & {
  shouldContinue: boolean;
};

export type ForVariableChangeParams = PSCEventParams & {
  variableName: string;
  oldValue?: number;
  newValue: number;
};

export type PreEvalExprParams = PSCEventParams & {
  expr: string;
};

export type PostEvalExprParams = PSCEventParams & {
  expr: string;
  result: PSCTypes;
};

export type PreIfConditionParams = PSCEventParams;

export type PostIfConditionParams = PSCEventParams & {
  result: boolean;
};

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
  pre_if_condition: PreIfConditionParams;
  post_if_condition: PostIfConditionParams;
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
