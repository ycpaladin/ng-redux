import { Middleware } from 'redux';
import { StateModule, ActionFunction } from './models';

export type CreateEffectMiddleware = (actions: Map<string, ActionFunction<any>>, ...modules: StateModule<any, any>[]) => Middleware;

export const createEffectMiddleware: CreateEffectMiddleware =
  (actions: Map<string, ActionFunction<any>>, ...modules: StateModule<any, any>[]) =>
    (api) => (dispatch) => (action) => {
      console.log(api);
      console.log(action)
      return action;
    }
