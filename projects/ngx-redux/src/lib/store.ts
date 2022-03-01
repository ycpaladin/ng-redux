import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateModule, Actions, IStoreService, ActionFunction } from './models';
import { MODULE_CONFIG, STORE_RPOVIDERS } from './token';
import { Store, AnyAction } from 'redux';
import { mapActions } from './mapActions';

@Injectable()
export class NgxReduxStore<S, A extends Actions<S>> {
  // store!: Store<S>;
  // module!: StateModule<S, A>
  // actions!: A;
  // [x: string]: ActionFunction<S> | undefined;

  constructor(
    @Inject(STORE_RPOVIDERS) public store: Store<S>,
    @Inject(MODULE_CONFIG) public module: StateModule<S, A>,
  ) {
    // (this as any)
    mapActions.call(this as any, module as any); // TODO...

    setTimeout(() => {
      console.log('==。', this)
    }, 0);
  }

  getState(): S {
    return this.store.getState();
  }

  dispatch(action: AnyAction): void {
    this.store.dispatch(action);
  }

  select<R>(pathFunction: (state: S) => R): Observable<R> {
    return new Observable<R>(subsciber => {
      const rootState = this.getState();
      let value = pathFunction((rootState as any)[this.module.name]);
      subsciber.next(value);
      const unListen = this.store.subscribe(() => {
        const rootState = this.getState();
        const nextValue = pathFunction((rootState as any)[this.module.name]);
        // const nextValue = pathFunction(this.getState());
        if (nextValue !== value) {
          value = nextValue;
          subsciber.next(value);
        }
      });
      return () => {
        unListen();
      }
    })
    // return
  }
}
