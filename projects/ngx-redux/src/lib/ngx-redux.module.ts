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

  static forRoot(reducers: Reducer<any, Action>, inittalState?: any): ModuleWithProviders<NgxReduxModule> {
    const store = createStore(reducers, inittalState);
    return {
      ngModule: NgxReduxModule,
      providers: [
        { provide: STORE_RPOVIDERS, useValue: store },
        NgxReduxStore
      ]
    }
  }

  static forConfig<S = State>(...module: StateModule<S, any>[]): ModuleWithProviders<NgxReduxModule> {

    // TODO... 三种情况处理
    const initialRootState = mergeState(module);
    const actions = createActions(module, initialRootState); // , () => store
    const reducer = createReducer(actions, initialRootState);
    const effects = createEffects(...module);
    const composeEnhaners = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

    const middleware = createEffectMiddleware(actions, effects);
    const enhancer = composeEnhaners(applyMiddleware(middleware)) // , plugin && plugin()
    // const enhancer = applyMiddleware(middleware,  plugin && plugin())
    const store = createStore(reducer as any, initialRootState, enhancer); // TODO
    // // __REDUX_DEVTOOLS_EXTENSION__


    const providers: Provider[] = [

    ]

    if (Array.isArray(module)) {
      module.forEach(m => {
        providers.push(
          {
            provide: m, useFactory() {
              return new NgxReduxStore(store, m as any)
            }, deps: []
          }
        )
      })
    } else {
      providers.push(
        {
          provide: module, useFactory() {
            return new NgxReduxStore(store, module as any)
          }, deps: []
        }
      )
    }

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
}
