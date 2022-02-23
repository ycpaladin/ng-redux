

import { Observable, of } from "rxjs";


export type ActionFunction<S> = (this: S, ...args: any[]) => void;
export type Actions<S = any> = { [key: string]: ActionFunction<S> }

export type Effect<M> = (this: M, ...args: any[]) => void; // Action<S>;
export type EffectsDep = any[];
export interface IStoreModule<S, D = []> {
  name: string;
  state: S,
  actions: Actions<S>,
  effects: {
    [key: string]: Effect<IStoreModule<S, D>>
  },
  effectsDep?: D
}


export interface User {
  name: string;
}
export interface IUserState {
  user: User | null;
  isFetching: boolean;
  error: boolean;
}

const userModule: IStoreModule<IUserState> = {
  name: 'user',
  state: {
    user: null,
    isFetching: false,
    error: false
  },
  actions: {
    login() {
      this.isFetching = true;
      this.error = false;
    },
    loginSucess(user: User) {
      this.isFetching = false;
      this.user = user;
    },
    loginFail(error) {
      this.isFetching = false;
      this.error = true;
    }
  },
  effects: {
    login(username: string, password: string) {
      // return of(this.actions.loginSucess)
      setTimeout(() => {
        // this.actions.loginSucess({ name: 'kevin'})
        // this.actions.loginSucess(this.state, {name: 'kevin'})
        this.actions.loginSucess.call(this.state, { name: 'kevin' })
        // this.effectsDep
      }, 2000);
    }
  },
  effectsDep: []
}

// userModule.actions
