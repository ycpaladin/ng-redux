import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Reducer } from './models';
import { createStore } from './createStore';
import { STORE_RPOVIDERS } from './token';
import { Store } from './store';



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
}
