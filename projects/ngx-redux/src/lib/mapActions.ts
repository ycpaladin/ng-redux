import { IStoreModule } from "./models";
import { NgxReduxStore } from "./ngx-redux.store";
import { getActionType } from "./utils";
// import { Store } from 'redux';

// , store: Store<S>
export function mapActions<S>(this: NgxReduxStore<S>, module: IStoreModule<S>) {
  Object.keys(module.actions).forEach((key) => {
    (this as any)[key] = (...rest: any[]) => {
      // const state = store.getState();
      const actionType = getActionType(module.name, key);
      this.dispatch({
        type: actionType,
        ...rest
      })
    }
  })
}
