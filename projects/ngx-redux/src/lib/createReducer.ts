import { getActionType, getModuleName } from './utils';
import { ActionConfig, ActionFunction, Actions, StateModule } from './models';
import { AnyAction } from 'redux';

export function createReducer2<S>(actions: Map<string, ActionFunction<S>>, initialState: S) {
  return (state = initialState, action: AnyAction): S => {
    const fn = actions.get(action.type);
    if (fn) {
      const { type, ...rest } = action;
      const params = Object.keys(rest).map(key => rest[key])
      fn.apply(state, params);
      // return {
      //   ...state
      // }
    }
    return state;
  }
}


export function createReducer<S>(actions: ActionConfig<S>, initialState: { [key: string]: any }) {
  // let initialState: { [key: string]: any }; //= null;
  return (state = initialState, action: AnyAction) => {
    const config = actions.get(action.type);
    if (config) {
      const { type, ...rest } = action;
      const { fn, module } = config
      const params = Object.keys(rest).map(key => rest[key]);
      // fn => moduleName
      // const moduleName = getModuleName(action.type);
      // const moduleName = modules.find(item => action.type === getActionType(item.))
      fn.apply(state[module.name] || state, params);
      // fn.apply(null as any, params);

      // return {
      //   ...state
      // }
    }
    return state;
  }


}
