import { StateModule, Actions } from "ngx-redux";

export interface User {
  username: string;
}
export interface IUserState {
  user: User | undefined;
  isFetching: boolean;
  error: boolean;
}

export interface UserActions extends Actions<IUserState> {
  login(username: string, password: string): void;
  loginSucess(user: User): void;
  loginFail(error: any): void;
  updateUser(username: string, age: number): void;
}

export const userModule: StateModule<IUserState, UserActions> = {
  name: 'user',
  state: {
    user: { username: 'kevin' },
    isFetching: false,
    error: false
  },
  actions: {
    login() {
      // this.isFetching = true;
      // this.error = false;
    },
    loginSucess(user: User) {
      // this.isFetching = false;
      // this.user = user;
    },
    loginFail(error) {
      // this.isFetching = false;
      // this.error = true;
    },
    updateUser(username: string, age: number) {
      // this.user = { username };
      // console.log(username, age);
    }
  },
  effects: {
    login(username: string, password: string) { // ofType(login)

    }
  },
  effectsDep: [1, 2]
}

// userModule.actions
