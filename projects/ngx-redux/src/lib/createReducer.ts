import { ActionConfig } from './models';
import { AnyAction } from 'redux';

export function createReducer<S>(actions: ActionConfig<S>, initialState: { [key: string]: any }) {
  return (state = initialState, action: AnyAction) => {
    const config = actions.get(action.type);
    if (config) {
      const { type, ...rest } = action;
      const { fn, module } = config
      const params = Array.from({ ...rest, length: Object.keys(rest).length }); // Object.keys(rest).map(key => rest[key]);
      fn.apply(state[module.name] || state, params);
    }
    return state;
  }


}
