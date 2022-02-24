import { IStoreModule, Actions } from "ngx-redux";

export interface User {
  username: string;
}
export interface IUserState {
  user: User | undefined;
  isFetching: boolean;
  error: boolean;
}

export interface UserActions extends Actions<IUserState> {
  login(): void;
  loginSucess(user: User): void;
  loginFail(error: any): void;
  updateUser(username: string, age: number): void;
}

export const userModule: IStoreModule<IUserState> = {
  name: 'user',
  state: {
    user: { username: 'kevin' },
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
    },
    updateUser(username: string, age: number) {
      this.user!.username = username;
      console.log(username, age);
    }
  },
  effects: {
    login(username: string, password: string) {
      // this
      // return of(this.actions.loginSucess)
      setTimeout(() => {
        // this.actions.loginSucess({ name: 'kevin'})
        // this.actions.loginSucess(this.state, {name: 'kevin'})
        // this.actions.loginSucess.call(this.state, { username: 'kevin' })
        // this.effectsDep
        // const [] = this;
      }, 2000);
    }
  },
  effectsDep: []
}

// userModule.actions
