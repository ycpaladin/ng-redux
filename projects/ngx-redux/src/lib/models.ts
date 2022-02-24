
import { Reducer, Action } from 'redux';
// export type ReducerFunc
export type Reducers = { [key: string]: Reducer };

export type State = { [key: string]: any }

export type Listener = () => void



export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type Actions<S = any> = { [key: string]: ActionFunction<S> }

export type Effect<M> = (this: M, ...args: any[]) => void; // Action<S>;
export type EffectsDep = any[];
export interface IStoreModule<S = State, A = Actions<S>, D = []> {
  name: string;
  state: S,
  actions: A,
  effects: {
    [key: string]: Effect<IStoreModule<S, A, D>>
  },
  effectsDep?: D
}
