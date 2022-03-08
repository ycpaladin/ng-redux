import { Store, AnyAction, Dispatch, Unsubscribe } from 'redux';
import { Observable } from 'rxjs';

// type ThisParameterType<T> = T extends (this: unknown, ...args: any[]) => any
//  T extends (this: infer U, ...args: any[]) => any
//   ? U
//   : unknown


export type State = { [key: string]: any }
// export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type EffectsDep = any[];

type Effects<S, A, D> = {
  [key in keyof A]?: A[key] // Effect<A & IStoreService<S, A>>
} & ThisType<A & IStoreService<S, A> & { deps: D }>
export interface StateModule<S, A = any, D = object[]> {
  readonly name: string;
  state: S;
  actions: A & ThisType<S>;
  effects: Effects<S, A, D>;
  effectsDeps?: D;
}

export interface ActionModule<S> {
  fn: Function;
  module: StateModule<S, any>;
}
export type ActionConfig<S> = Map<string, ActionModule<S>>;

export type IStoreService<S, A> = {
  module: StateModule<S, A>;
  store: Store<S, AnyAction>;
  dispatch(action: AnyAction): void;
  select<R>(pathFunction: (state: S) => R): Observable<R>;
} & A; // A


export interface SelectContext<S> {
  store: {
    dispatch: Dispatch<AnyAction>;
    getState(): S;
    subscribe(listener: () => void): Unsubscribe;
  };
  module: StateModule<S, any>;
}


export type PathFunction<S, R> = (state: S) => R;

// ---------------------- test---------

class A {
  a!: string;
}

class B {
  b!: string;
}

class C {
  c!: string;
}

type Flatten<T> = T extends Array<infer U> ? U : never

//  = any[]
export type Root<D = object[]> = {
  deps: D;
  depsInstance: () => void
} & ThisType<{ depArray: Flatten<D>[] }>

// <[typeof A, typeof B, typeof C]>
const root: Root<[typeof A, typeof B, typeof C]> = {
  deps: [A, B, C],
  depsInstance: function () {
    const [a, b, c] = this.depArray;

  }
}
