import { Middleware, Action } from 'redux';
import { isObservable } from 'rxjs';
import { mapActions } from './mapActions';
import { StateModule, Effect, ActionConfig } from './models';

export type CreateEffectMiddleware = (actions: ActionConfig<any>, effects: Map<string, Effect<any>>) => Middleware;

export const createEffectMiddleware: CreateEffectMiddleware = (actions: ActionConfig<any>, effects: Map<string, Effect<any>>) => (api) => (dispatch) => (action: Action<string>) => {
  const { type, ...rest } = action;
  const actionConfig = actions.get(type);
  const effectFn = effects.get(type);
  if (effectFn && actionConfig) {
    const { module } = actionConfig;
    const context = {
      module,
      dispatch,
      store: api,
      select: () => undefined,
    }
    actions.forEach(({ module: m }) => {
      if (m === module) {
        mapActions.call(context, m as any);
      }
    })
    const result = effectFn.apply(
      context,
      Array.from({
        ...rest,
        length: Object.keys(rest).length
      })
    );

    if (isObservable(result)) {
      const sub$ = result.subscribe(() =>
        Promise.resolve().then(() => sub$.unsubscribe())
      );
    }
  }
  return dispatch(action);
}
