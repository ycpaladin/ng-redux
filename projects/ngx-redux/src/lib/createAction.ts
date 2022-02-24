import { ActionFunction, IStoreModule, } from './models';
import { Store } from 'redux';

export function createAction<S>(action: ActionFunction<S>, name: string) {

  // (p, p2, p3) => {}
  // ===> { type: '', p, p2, p3 }
  //
  // action.arguments
  return {
    type: `[${name}] ${action.name}`,
    fn: action // .bind(state)
  }
}


export function createActions<S>(module: IStoreModule<S>, getStore: () => Store<S>) {
  const keys = Object.keys(module.actions);
  return keys.reduce((prev, key) => {
    // prev.set
    const action = createAction(module.actions[key], module.name);
    // const _actionFn = function (...rest: any[]) {
    //   const store = getStore();
    //   // store.dispatch({
    //   //   type: action.type,
    //   //   payload: {
    //   //     ...rest
    //   //   }
    //   // })
    // }
    prev.set(action.type, action.fn); // action.fn
    return prev;
  }, new Map<string, ActionFunction<S>>())
}


// export function xxxFactory<S>(store: Store<S>, actions: Map<string, ActionFunction<S>>) {
//   // const keys = Object.keys(actions);
//   actions.forEach((fn, key) => {

//   })
// }
