import { ActionFunction } from './models';
import { AnyAction } from 'redux';

export function createReducer<S>(actions: Map<string, ActionFunction<S>>, initialState: S) {
  return (state = initialState, action: AnyAction): S => {
    const fn = actions.get(action.type);
    if (fn) {
      const { type, ...rest } = action;
      const params = Object.keys(rest).map(key => rest[key])
      fn.apply(state, params)
    }
    return state;
  }
}
