
import { Reducer, Action, AnyAction } from 'redux';
import { Observable } from 'rxjs';
// export type ReducerFunc
export type Reducers = { [key: string]: Reducer };

export type State = { [key: string]: any }

export type Listener = () => void



export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type Actions<S = any> = { [key: string]: ActionFunction<S> }

export type Effect<S, D> = (this: { state: S, deps: D, storeService: IStoreService<S> }, ...args: any[]) => void; // Action<S>;
export type EffectsDep = any[];
export interface IStoreModule<S extends State, D = any[]> {
  name: string;
  state: S,
  actions: Actions<S>,
  effects: {
    [key: string]: Effect<S, D>
  },
  effectsDep?: D
}


export interface IStoreService<S extends State, A = Actions<S>, M = IStoreModule<S, A>> {
  module: M;
  actions: A;

  dispatch(action: AnyAction): void;

  select<R>(pathFunction: (state: S) => R): Observable<R>;
}

