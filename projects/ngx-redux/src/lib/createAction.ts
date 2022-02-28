import { ActionFunction, Actions, StateModule, } from './models';
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
// export function createActions<S>(module: StateModule<S, Actions<S>>):  Map<string, ActionFunction<S>>
export function createActions<S>(module: StateModule<S, Actions<S>> | StateModule<S, Actions<S>>[]) {
  if (Array.isArray(module)) {
    return module.reduce((prev, curr) => {
      const actions = createActions(curr);
      // prev.set()

      actions.forEach((fn, key) => {
        prev.set(key, fn);
      });
      return prev;
    }
      , new Map<string, ActionFunction<any>>());
  } else {
    const keys = Object.keys(module.actions);
    return keys.reduce((prev, key) => {
      const action = createAction(module.actions[key], module.name);
      const fn = function (this: S, ...rest: any[]) {
        action.fn.call(this, ...rest)
      }
      prev.set(action.type, fn); // action.fn
      return prev;
    }, new Map<string, ActionFunction<S>>())
  }
}

// export function createActions2(...modules: StateModule<any, Actions<any>>[]) {
//   return modules.reduce((prev, curr) => {
//     const actions = createActions(curr);
//     prev.set()
//     return prev;
//   }
//   , new Map<string, ActionFunction<any>>());
// }
