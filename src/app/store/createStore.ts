import { } from './models';
// import { isFunction } from './utils';
import { Action, Reducer, State, Store, Listener } from "./models";


export function createStore<S = State>(reducers: Reducer<S>, initState: { [key: string]: any } | S,): Store<S> {
  let __STATE__ = initState || {};
  const listener: Listener[] = [];
  const INIT_ACTION = '@redux\\init';
  function getState(): S {
    return __STATE__ as S;
  }

  function dispatch(action: Action): void {
    __STATE__ = reducers(__STATE__ as S, action);
    listener.forEach(fn => fn(__STATE__))
  }

  function subscribe(fn: Listener) {
    listener.push(fn);
    return () => {
      const index = listener.findIndex(i => i === fn);
      listener.splice(index, 1);
    }
  }

  dispatch({ type: INIT_ACTION });

  return {
    getState,
    dispatch
  }
}
