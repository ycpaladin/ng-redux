import { Action } from '@s';
import { createActions } from './createAction';
import { IStoreModule } from "./store.service";

// IStoreModule<S> => (state, action) => state
export function createReducer<S>(module: IStoreModule<S>) {
  const actions = createActions(module);
  return (state = module.state, action: Action): S => {
    const fn = actions.get(action.type);
    if (fn) {
      const {type, ...rest} = action;
      const params = Object.keys(rest).map(key => rest[key])
      fn.apply(state, params)
    }
    return state;
  }
}
