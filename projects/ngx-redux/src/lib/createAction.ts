import { ActionFunction, Actions, StateModule, ActionConfig, ActionModule } from './models';
// import { Store } from 'redux';
import { getActionType } from './utils';


/**
 * fn => { type: [fn name], ...fn.params}
 * @param action
 * @param name
 * @returns
 */
export function createAction<S>(action: ActionFunction<S>, name: string) {

  // (p, p2, p3) => {}
  // ===> { type: '', p, p2, p3 }
  //
  // action.arguments
  return {
    type: getActionType(name, action),
    fn: action // .bind(state)
  }
}
export function createActions<S>(module: StateModule<S, Actions<S>> | StateModule<S, Actions<S>>[], initialRootState: { [key: string]: any }): ActionConfig<S> {
  if (Array.isArray(module)) {
    return module.reduce((prev, curr) => {
      const actions = createActions(curr, initialRootState);
      actions.forEach(({ fn, fnName, module }, key) => {
        prev.set(key, { fn, module, fnName });
      });
      return prev;
    }
      , new Map<string, ActionModule<S>>());
  } else {
    const keys = Object.keys(module.actions);
    return keys.reduce((prev, key) => {
      const action = createAction(module.actions[key], module.name);
      const fn = function (...rest: any[]) {
        action.fn.call(initialRootState[module.name], ...rest);
      }
      prev.set(action.type, { fn, fnName: key, module }); // action.fn
      return prev;
    }, new Map<string, ActionModule<S>>())
  }
}

