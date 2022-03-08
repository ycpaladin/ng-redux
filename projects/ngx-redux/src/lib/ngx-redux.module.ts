import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { createActions } from './createAction';
import { createReducer } from './createReducer';
import { StateModule, State } from './models';
import { NgxReduxStore } from './store';
import { STORE_RPOVIDERS } from './token';
import { createStore, Reducer, Action, applyMiddleware, compose } from 'redux';
import { mergeState } from './mergeState';
import { createEffectMiddleware } from './middleware';
import { createEffects } from './createEffects';


@NgModule({})
export class NgxReduxModule {

  static forRoot(...module: StateModule<any>[]): ModuleWithProviders<NgxReduxModule> {
    if (!module || (module && !module.length)) {
      throw 'the parameter "module" must have a valid value!'
    }
    const initialRootState = mergeState(module);
    const actions = createActions(module, initialRootState);
    const reducer = createReducer(actions, initialRootState);
    const effects = createEffects(module);
    const composeEnhaners = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

    const middleware = createEffectMiddleware(actions, effects);
    const enhancer = composeEnhaners(applyMiddleware(middleware))
    const store = createStore(reducer, initialRootState, enhancer); // TODO

    const providers: Provider[] = [
    ]

    module.forEach(m => {
      providers.push(
        {
          provide: m,
          useFactory() {
            // console.log(arguments);
            m.effectsDeps = Array.from(arguments);
            return new NgxReduxStore(store, m)
          }, deps: m.effectsDeps
        }
      )
    })


    return {
      ngModule: NgxReduxModule,
      providers: [
        // { provide: STORE_RPOVIDERS, useValue: store },
        // { provide: MODULE_CONFIG, useValue: module },
        // { provide: ACTIONS_PROVIDERS, useValue: actions },
        // NgxReduxStore,
        // Store2
        ...providers
      ]
    }
  }

  static forFeature(module: StateModule<any, any>): ModuleWithProviders<NgxReduxModule> {

    return {
      ngModule: NgxReduxModule,
    }
  }
}
