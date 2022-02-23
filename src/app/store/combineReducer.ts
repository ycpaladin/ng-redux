import { Action, Reducers, State } from './models';


export function combineReducers<S = State>(reducers: Reducers) {
  const keys = Object.keys(reducers);
  return (state: S, action: Action) => {
    return keys.reduce<S>((prev, key) => {
      const reducer = reducers[key];
      const _state = (state as any)[key];
      (prev as any)[key] = reducer(_state, action)
      return prev;
    }, state)
  }
}
