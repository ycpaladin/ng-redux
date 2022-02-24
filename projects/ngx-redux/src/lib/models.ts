
import { Reducer, Action } from 'redux';
// export type ReducerFunc
export type Reducers = { [key: string]: Reducer };

export type State = { [key: string]: any }

export type Listener = () => void



export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type Actions<S = any> = { [key: string]: ActionFunction<S> }

export type Effect<M> = (this: M, ...args: any[]) => void; // Action<S>;
export type EffectsDep = any[];
export interface IStoreModule<S = State, D = []> {
  name: string;
  state: S,
  actions: Actions<S>,
  effects: {
    [key: string]: Effect<IStoreModule<S, D>>
  },
  effectsDep?: D
}


export interface IStoreService<S = State, A = Actions<S>, M = IStoreModule> {
  module: M;
  actions: A;
}


// export interface UserState {
//   username: string;
// }

// export interface UserActions<S> extends Actions<S> {
//   login(this: S): void;
// }

// const moduleConfig: IStoreModule<UserState, UserActions<UserState>> = {
//   name: 'user',
//   state: {
//     username: 'kevin'
//   },
//   actions: {
//     login() {
//       // this.username
//     }
//   },
//   effects: {

//   }
// }

// const ss: IStoreService<UserState, UserActions<UserState>> = {
//   module: moduleConfig,
//   actions: {
//     login(){

//     }
//   }
// }


