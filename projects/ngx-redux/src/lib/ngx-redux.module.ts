import { ModuleWithProviders, NgModule } from '@angular/core';
import { createActions } from './createAction';
import { createReducer } from './createReducer';
// import { createStore } from './createStore';
import { IStoreModule } from './models';
import { NgxReduxStore } from './ngx-redux.store';
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

  static forConfig(module: IStoreModule<any>): ModuleWithProviders<NgxReduxModule> {
    let store: Store<any>;
    const actions = createActions(module); // , () => store
    const reducer = createReducer(actions, module.state);
    const plugin = (window as any)['__REDUX_DEVTOOLS_EXTENSION__'];
    store = createStore(reducer, module.state, plugin && plugin());
    // __REDUX_DEVTOOLS_EXTENSION__
    return {
      ngModule: NgxReduxModule,
      providers: [
        { provide: STORE_RPOVIDERS, useValue: store },
        { provide: MODULE_CONFIG, useValue: module },
        { provide: ACTIONS_PROVIDERS, useValue: actions },
        NgxReduxStore,
        // Store2
      ]
    }
  }
}
