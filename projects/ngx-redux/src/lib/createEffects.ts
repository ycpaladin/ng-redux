import { StateModule } from './models';
import { getActionType } from './utils';

export function createEffects(...modules: StateModule<any, any>[]) {
  const effects = new Map<string, Function>();
  modules.forEach(module => {
    Object.keys(module.effects).forEach(key => {
      const _effectFn = module.effects[key]!;
      const effectFn = function (this: any, ...rest: any[]) {
        return _effectFn.call(this, ...rest);
      }
      effects.set(getActionType(module.name, key), effectFn)
    })
  });
  return effects;
}
