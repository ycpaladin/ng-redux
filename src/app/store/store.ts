import { Inject, Injectable } from "@angular/core";
import { STORE_RPOVIDERS } from "./token";
import { Action, State, Store as _Store } from './models';

@Injectable()
export class Store<S = State> implements _Store<S> {
  constructor(@Inject(STORE_RPOVIDERS) public store: _Store<S>) {
  }

  getState(): S {
    return this.store.getState();
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  select<R>(pathFunction: (state: S) => R) {
    return pathFunction(this.getState())
  }

}
