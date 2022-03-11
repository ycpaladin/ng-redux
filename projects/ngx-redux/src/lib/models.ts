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
  [K in keyof A]?: A[K] // Effect<A & IStoreService<S, A>>
} & ThisType<A & IStoreService<S, A> &
{
  deps: { [K in keyof D]: D[K] extends new (...args: any) => infer I ? I : never }
}>
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

// class A {
//   a!: string;
// }

// class B {
//   b!: string;
// }

// class C {
//   c!: string;
// }

// // type Flatten<T> = T extends Array<infer U> ? U : never

// //  = any[]
// function helper<T>(root: Root<T>) {
//   return root;
// }

// export type Root<D = object[]> = {
//   deps: D;
//   depsInstance: () => void
// } & ThisType<{ depArray: { [K in keyof D]: D[K] extends new (...args: any) => infer I ? I : never } }>


// const root = helper({
//   deps: [A, B, C] as const,
//   depsInstance: function () {
//     const [a, b, c] = this.depArray;

//   }
// })
// const root: Root<[typeof A, typeof B, typeof C]> = {
//   deps: [A, B, C],
//   depsInstance: function () {
//     const [a, b, c] = this.depArray;

//   }
// }

// !联合 -> 元组
// // oh boy don't do this
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
// type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

// // TS4.0+
// type Push<T extends any[], V> = [...T, V];

// // TS4.1+
// type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
//   true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

// type abc = 'a' | 'b' | 'c';
// type t = TuplifyUnion<abc>; // ["a", "b", "c"]

// ! typeof -> type
// class Factory<T extends typeof BaseModel> {
//   private _modelClass : T

//   constructor(modelClass : T) {
//     this._modelClass = modelClass
//   }

//   // note the declared return type
//   build(): T['prototype'] {
//     return new this._modelClass()
//   }

//   echoClassMethod() {
//     console.log(this._modelClass.classMethod())
//   }
