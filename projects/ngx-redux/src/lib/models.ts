
import { Reducer, Store, AnyAction } from 'redux';
import { Observable } from 'rxjs';
// export type ReducerFunc
export type Reducers = { [key: string]: Reducer };

export type State = { [key: string]: any }

export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type Actions<S = Object> = { [key: string]: ActionFunction<S> }

export type Effect<M> = (this: M, ...args: any[]) => void | AnyAction | Observable<AnyAction>;
export type EffectsDep = any[];
export interface IStoreModule<S extends State, A extends Actions<S>, D = any[]> {
  name: string;
  state: S,
  actions: Actions<S>,
  effects: {
    // D &
    [key: string]: Effect<A & IStoreService<S, A>>
  },
  effectsDep?: D
}


// export interface IStoreService<S extends State, A extends Actions<S>, M = IStoreModule<S, A>> {
//   module: M;
//   actions: A;

//   dispatch(action: AnyAction): void;

//   select<R>(pathFunction: (state: S) => R): Observable<R>;
// }

export type EA<A> = Partial<A>;

export type IStoreService<S extends State, A extends Actions<S>> = {
  [key: string]: any;
  module: IStoreModule<S, A>;
  store: Store<S, AnyAction>;
  // actions: A;
  dispatch(action: AnyAction): void;
  select<R>(pathFunction: (state: S) => R): Observable<R>;
} & A; // A


// export interface IState {

// }

// export interface A extends Actions<IState> {
//   login(): void;
// }

// const x: IStoreService<State, A> = {
//   // module:
//   login() {

//   }
// }
// console.log(x);

