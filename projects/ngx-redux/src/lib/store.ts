import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateModule, SelectContext, PathFunction } from './models';
import { MODULE_CONFIG, STORE_RPOVIDERS } from './token';
import { Store, AnyAction } from 'redux';
import { mapActions } from './mapActions';
import { select } from './select';

@Injectable()
export class NgxReduxStore<S, A> implements SelectContext<S>{

  select<S, R>(pathFunction: PathFunction<S, R>): Observable<R> {
    return select.call(this, pathFunction as any) as any;
  }

  constructor(
    @Inject(STORE_RPOVIDERS) public store: Store<S>,
    @Inject(MODULE_CONFIG) public module: StateModule<S, A>,
  ) {
    mapActions.call(this as any, module);
  }

  getState(): S {
    return this.store.getState();
  }

  dispatch(action: AnyAction) {
    this.store.dispatch(action);
  }

}
