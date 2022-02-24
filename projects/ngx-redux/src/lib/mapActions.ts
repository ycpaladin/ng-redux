import { IStoreModule } from "./models";
import { NgxReduxStore } from "./store";
import { getActionType } from "./utils";
// import { Store } from 'redux';

// , store: Store<S>
export function mapActions<S, A>(this: NgxReduxStore<S, A>, module: IStoreModule<S, A>) {
  (this.actions as any) = {}
  Object.keys(module.actions).forEach((key) => {
    (this.actions as any)[key] = (...rest: any[]) => {
      // const state = store.getState();
      const actionType = getActionType(module.name, key);
      this.dispatch({
        type: actionType,
        ...rest
      })
    }
  })
}