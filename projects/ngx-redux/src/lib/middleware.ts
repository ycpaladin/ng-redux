import { Middleware } from 'redux';

export type CreateEffectMiddleware = () => Middleware;

export const createEffectMiddleware: CreateEffectMiddleware = () => ({ getState, dispatch }) => (action) => {

  return action;
}
