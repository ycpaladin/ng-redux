import { Action } from '@s';
import { IStoreModule, ActionFunction } from "./store.service";


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


export function createActions<S>(module: IStoreModule<S>) {
  const keys = Object.keys(module.actions);
  return keys.reduce((prev, key) =>{
    // prev.set
    const action = createAction(module.actions[key], module.name);
    prev.set(action.type, action.fn);
    return prev;
  }, new Map<string, ActionFunction<S>>())
}
