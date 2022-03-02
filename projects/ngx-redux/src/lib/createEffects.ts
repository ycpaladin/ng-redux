import { AnyAction } from 'redux';
import { Effect, StateModule } from './models';
import { getActionType } from './utils';

// { module: }
export function createEffects(...modules: StateModule<any, any>[]) {
  // effect -> { type: [state module name] action name, fn: effectFn }

  // action -> effect.ofType()
  const effects = new Map<string, Effect<any>>();
  modules.forEach(module => {
    // effects
    Object.keys(module.effects).forEach(key => {
      const _effectFn = module.effects[key];
      const effectFn = function(this: any, ...rest: any[]) {
        _effectFn.call(this, ...rest);
      }
      effects.set(getActionType(module.name, key), effectFn)
    })
  });
  return effects;
}

export function ofType() {
  return function (action: AnyAction) {
    // if () {

    // }
    /**
     * if  action.type === effect.type
     *
     * execute effect fn  -> bind this
     */
  }
}
