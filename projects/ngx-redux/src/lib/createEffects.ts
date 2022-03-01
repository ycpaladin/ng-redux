import { AnyAction } from 'redux';
import { StateModule } from './models';

// { module: }
export function createEffects(...modules: StateModule<any, any>[]) {
  // effect -> { type: [state module name] action name, fn: effectFn }

  // action -> effect.ofType()
  return function () {

  }
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
