import { Middleware, Action } from 'redux';
import { isObservable } from 'rxjs';
import { mapActions } from './mapActions';
import { Effect, ActionConfig, PathFunction } from './models';
import { select } from './select';

export type CreateEffectMiddleware = (actions: ActionConfig<any>, effects: Map<string, Effect<any>>) => Middleware;

export const createEffectMiddleware: CreateEffectMiddleware = (actions: ActionConfig<any>, effects: Map<string, Effect<any>>) => (api) => (dispatch) => (action: Action<string>) => {
  Promise.resolve().then(() => {
    const { type, ...rest } = action;
    const actionConfig = actions.get(type);
    const effectFn = effects.get(type);
    if (effectFn && actionConfig) {
      const { module } = actionConfig;
      const context = {
        module,
        dispatch,
        store: api,
        select: <S, R>(pathFun: PathFunction<S, R>) => {
          return select.call({
            module,
            store: {
              ...api,
              subscribe: (listenr) => {
                return () => {
                  // ???
                }
              }
            }
          }, pathFun as any)
        },  // TODO...
      }
      actions.forEach(({ module: m }) => {
        if (m === module) {
          mapActions.call(context, m as any); // 把 actions 挂到 context上
        }
      });
      // 调用effect方法
      const result = effectFn.apply(
        context,
        Array.from({
          ...rest,
          length: Object.keys(rest).length
        })
      );

      // 返回值如果是一个可观察对象, 则还要订阅
      if (isObservable(result)) {
        const sub$ = result.subscribe(() =>
          Promise.resolve().then(() => sub$.unsubscribe())
        );
      }
    }
  });
  return dispatch(action);
}
