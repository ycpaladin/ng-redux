import { getActionType, getModuleName } from './utils';
import { ActionFunction, Actions, StateModule } from './models';
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


export function createReducer<S>(actions: Map<string, ActionFunction<S>>, initialState: { [key: string]: any }) {
  // let initialState: { [key: string]: any }; //= null;
  return (state = initialState, action: AnyAction) => {
    const fn = actions.get(action.type);
    if (fn) {
      const { type, ...rest } = action;
      const params = Object.keys(rest).map(key => rest[key]);
      // fn => moduleName
      const moduleName = getModuleName(action.type);
      // const moduleName = modules.find(item => action.type === getActionType(item.))
      fn.apply(state[moduleName] || state, params);
      // return {
      //   ...state
      // }
    }
    return state;
  }


}
