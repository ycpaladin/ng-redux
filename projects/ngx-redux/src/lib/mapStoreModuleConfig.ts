import { Actions } from 'ngx-redux';
import { StoreModuleConfig, StateModule, State } from './models';
// import { isStateModule } from './utils';

// config[] => store // {} => store //
// export function mapStoreModuleConfig<S, A extends Actions<S>>(config: StateModule<S, any>): StateModule<S, A>;
// export function mapStoreModuleConfig<S1, A1 extends Actions<S1>, M1 = StateModule<S1, A1>>(...config: [M1]): StateModule<S1, A1>;
export function mapStoreModuleConfig<S, S1, S2, S3, M = StateModule<S, any>, M1 = StateModule<S1, any>, M2 = StateModule<S2, any>, M3 = StateModule<S3, any>, SS = {
  0: S,
  1: S1
}>(...config: [M, M1, M2, M3])
  : StateModule<SS, Actions<SS>> {
  // if (isStateModule(config)) {
  //   // config.
  // } else if (isStoreModuleConfig(config)) {
  //   // config.
  // } else if (Array.isArray(config)) {
  //   // config.
  //   config
  // } else {

  // }

  const golbalState = {
    name: 'global',
    state: {},
    actions: {},
    effects: {}
  } as StateModule<{ [key: string]: any }, {}>

  // config.reduce((prev, curr) => {
  //   // prev[curr.name] = curr;
  //   prev.state[curr.name] = curr.state;
  //   return prev;
  // }, golbalState)


  return config[0] as any
}
// /**
//  * { name: 'user', state: { username: string; age: number; .....}, actions: { login() {}, } } []
//  * { name: 'g', state: { user: {} } }
//  *
//  *
//  *
//  *
//  */

// interface State1 {
//   username: string;
//   age: number;
// }

// interface A1 {
//   login(): void;
// }

// const s1: StateModule<State1, A1> = {
//   name: 'user',
//   state: { username: '', age: 1 },
//   actions: {
//     login(){}

//   },
//   effects: {

//   }
// };
// mapStoreModuleConfig(s1)
