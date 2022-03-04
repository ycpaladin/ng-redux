import { StateModule, ActionConfig, ActionModule } from './models';
// import { Store } from 'redux';
import { getActionType } from './utils';


/**
 * fn => { type: [fn name], ...fn.params}
 * @param action
 * @param name
 * @returns
 */
export function createAction<S>(action: Function, name: string) {
  return {
    type: getActionType(name, action),
    fn: action // .bind(state)
  }
}
export function createActions<S>(module: StateModule<S> | StateModule<S>[], initialRootState: { [key: string]: any }): ActionConfig<S> {
  if (Array.isArray(module)) {
    return module.reduce((prev, curr) => {
      const actions = createActions(curr, initialRootState);
      actions.forEach(({ fn, fnName, module }, key) => {
        prev.set(key, { fn, module, fnName });
      });
      return prev;
    }, new Map<string, ActionModule<S>>());
  } else {
    const keys = Object.keys(module.actions);
    return keys.reduce((prev, key) => {
      const action = createAction(module.actions[key], module.name);
      prev.set(action.type, {
        fn: action.fn.bind(initialRootState[module.name]),
        fnName: key,
        module
      }); // action.fn
      return prev;
    }, new Map<string, ActionModule<S>>())
  }
}

