import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listener, State } from './models';
import { STORE_RPOVIDERS } from './token';
import { Store, AnyAction } from 'redux';

@Injectable()
export class NgxReduxStore<S = State> {

  constructor(@Inject(STORE_RPOVIDERS) public store: Store<S>) {
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
