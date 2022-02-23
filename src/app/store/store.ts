import { Inject, Injectable } from "@angular/core";
import { MODULE_CONFIG, STORE_RPOVIDERS } from "./token";
import { Action, Listener, State, Store as _Store } from './models';
import { Observable } from "rxjs";
import { ActionFunction, IStoreModule } from "./store.service";

@Injectable()
export class Store<S = State> implements _Store<S> {
  constructor(@Inject(STORE_RPOVIDERS) public store: _Store<S>) {
  }
  subscribe(fn: Listener): () => void {
    return this.store.subscribe(fn);
  }

  getState(): S {
    return this.store.getState();
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  select<R>(pathFunction: (state: S) => R): Observable<R> {
    return new Observable<R>(subsciber => {
      let value = pathFunction(this.getState());
      subsciber.next(value);
      const unListen = this.subscribe((state: S) => {
        const nextValue = pathFunction(state);
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

@Injectable()
export class Store2<S = State> {
  constructor(
    @Inject(STORE_RPOVIDERS) public store: _Store<S>,
    @Inject(MODULE_CONFIG) public moduleConfig: IStoreModule<S>
    ) {
  }

  dispatch(action: ActionFunction<S>): void {
    // this.store.dispatch(action);
    // action()

  }

  select<R>(pathFunction: (state: S) => R): Observable<R> {
    return new Observable<R>(subsciber => {
      let value = pathFunction(this.store.getState());
      subsciber.next(value);
      const unListen = this.store.subscribe((state: S) => {
        const nextValue = pathFunction(state);
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
