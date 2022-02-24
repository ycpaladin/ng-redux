import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listener, IStoreModule, Actions, IStoreService } from './models';
import { MODULE_CONFIG, STORE_RPOVIDERS } from './token';
import { Store, AnyAction } from 'redux';
import { mapActions } from './mapActions';

@Injectable()
export class NgxReduxStore<S, A = Actions<S>> implements IStoreService<S, A>{

  actions!: A;

  constructor(
    @Inject(STORE_RPOVIDERS) public store: Store<S>,
    @Inject(MODULE_CONFIG) public module: IStoreModule<any>,
  ) {
    // (this as any)
    mapActions.call(this as any, module as any); // TODO...

    setTimeout(() => {
      console.log('==。', this)
    }, 0);
  }
  subscribe(fn: Listener): () => void {
    return this.store.subscribe(fn);
  }

  getState(): S {
    return this.store.getState();
  }

  dispatch(action: AnyAction): void {
    this.store.dispatch(action);
  }

  select<R>(pathFunction: (state: S) => R): Observable<R> {
    return new Observable<R>(subsciber => {
      let value = pathFunction(this.getState());
      subsciber.next(value);
      const unListen = this.subscribe(() => {
        const nextValue = pathFunction(this.getState());
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
