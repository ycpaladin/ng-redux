import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { createActions } from './createAction';
import { createReducer } from './createReducer';
// import { createStore } from './createStore';
import { StateModule, State } from './models';
import { NgxReduxStore } from './store';
import { STORE_RPOVIDERS, MODULE_CONFIG, ACTIONS_PROVIDERS } from './token';
import { createStore, Reducer, Action, applyMiddleware, compose } from 'redux';
import { mergeState } from './mergeState';
import { createEffectMiddleware } from './middleware';


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
    const actions = createActions(module); // , () => store
    const rootState = mergeState(module);
    const reducer = createReducer(actions, rootState);
    const plugin = (window as any)['__REDUX_DEVTOOLS_EXTENSION__'];
    const middleware = createEffectMiddleware(actions, ...module);
    const enhancer = applyMiddleware(middleware) // , plugin && plugin()
    // const enhancer = applyMiddleware(middleware,  plugin && plugin())
    const store = createStore(reducer as any, rootState, enhancer); // TODO
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
