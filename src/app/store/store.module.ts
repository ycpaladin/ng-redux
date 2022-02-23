import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Reducer } from './models';
import { createStore } from './createStore';
import { MODULE_CONFIG, STORE_RPOVIDERS } from './token';
import { Store, Store2 } from './store';
import { IStoreModule } from './store.service';
import { createReducer } from './createReducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class MyStoreModule {
  static forRoot(reducers: Reducer, inittalState?: any): ModuleWithProviders<MyStoreModule> {
    const store = createStore(reducers, inittalState);
    return {
      ngModule: MyStoreModule,
      providers: [
        { provide: STORE_RPOVIDERS, useValue: store },
        Store
      ]
    }
  }

  static forConfig(module: IStoreModule<any>): ModuleWithProviders<MyStoreModule>{
    const reducer = createReducer(module)
    const store = createStore(reducer, module.state);
    return {
      ngModule: MyStoreModule,
      providers: [
        { provide: STORE_RPOVIDERS, useValue: store },
        { provide: MODULE_CONFIG, useValue: module},
        Store,
        Store2
      ]
    }
  }
}
