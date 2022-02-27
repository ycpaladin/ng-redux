import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { createActions } from './createAction';
import { createReducer } from './createReducer';
// import { createStore } from './createStore';
import { StateModule, State } from './models';
import { NgxReduxStore } from './store';
import { STORE_RPOVIDERS, MODULE_CONFIG, ACTIONS_PROVIDERS } from './token';
import { createStore, Reducer, Action, Store } from 'redux';


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

  static forConfig<S = State>(module: StateModule<S, any> | StateModule<S, any>[] | { [key: string]: StateModule<S, any> }): ModuleWithProviders<NgxReduxModule> {

    // TODO... 三种情况处理
    // const actions = createActions(module); // , () => store
    // const reducer = createReducer(actions, module.state);
    // const plugin = (window as any)['__REDUX_DEVTOOLS_EXTENSION__'];
    // const store = createStore(reducer, module.state as any, plugin && plugin()); // TODO
    // // __REDUX_DEVTOOLS_EXTENSION__

    // const providers: Provider[] = [
    //   {
    //     provide: module, useFactory() {
    //       return new NgxReduxStore(store, module)
    //     }, deps: []
    //   }
    // ]

    return {
      ngModule: NgxReduxModule,
      providers: [
        // { provide: STORE_RPOVIDERS, useValue: store },
        // { provide: MODULE_CONFIG, useValue: module },
        // { provide: ACTIONS_PROVIDERS, useValue: actions },
        // NgxReduxStore,
        // Store2
        // ...providers
      ]
    }
  }
}
