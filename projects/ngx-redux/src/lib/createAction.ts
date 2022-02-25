import { ActionFunction, Actions, IStoreModule, } from './models';
import { Store } from 'redux';
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

// , getStore: () => Store<S>
export function createActions<S>(module: IStoreModule<S, Actions<S>>) {
  const keys = Object.keys(module.actions);
  return keys.reduce((prev, key) => {
    // prev.set
    const action = createAction(module.actions[key], module.name);
    const _actionFn = function (this: S, ...rest: any[]) {
      action.fn.call(this, ...rest)
    }

    prev.set(action.type, _actionFn); // action.fn
    return prev;
  }, new Map<string, ActionFunction<S>>())
}


// export function xxxFactory<S>(store: Store<S>, actions: Map<string, ActionFunction<S>>) {
//   // const keys = Object.keys(actions);
//   actions.forEach((fn, key) => {

//   })
// }
