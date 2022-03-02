import { Effect, StateModule } from './models';
import { getActionType } from './utils';

export function createEffects(...modules: StateModule<any, any>[]) {
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
