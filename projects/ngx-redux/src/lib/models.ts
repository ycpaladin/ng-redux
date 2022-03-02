import { Store, AnyAction } from 'redux';
import { Observable } from 'rxjs';

export type State = { [key: string]: any }
export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type Actions<S> = {
  [key: string]: ActionFunction<S>;
}
export type Action<S, A> = { [key in keyof A]: ActionFunction<S> }  //  A[key]

export type Effect<M> = (this: M, ...args: any[]) => void | Promise<void> | Observable<void>;
export type EffectsDep = any[];

type Effects<S, A extends Actions<S>> = {
  [key in keyof A]?: Effect<A & IStoreService<S, A>>
}
export interface StateModule<S, A extends Actions<S>, D = any[]> {
  name: string;
  state: S,
  actions: Action<S, A>,
  effects: Effects<S, A>,
  effectsDep?: D
}

export interface ActionModule<S> {
  fn: ActionFunction<S>;
  fnName: string;
  module: StateModule<S, any>;
}
export type ActionConfig<S> = Map<string, ActionModule<S>>;

export type IStoreService<S, A extends Actions<S>> = {
  [key: string]: any;
  module: StateModule<S, A>;
  store: Store<S, AnyAction>;
  dispatch(action: AnyAction): void;
  select<R>(pathFunction: (state: S) => R): Observable<R>;
} & A; // A
