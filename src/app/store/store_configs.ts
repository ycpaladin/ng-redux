import { HttpClient } from '@angular/common/http';
import { StateModule } from "ngx-redux";
import { of } from "rxjs";
import { map } from "rxjs/operators";

export interface User {
  username: string;
}
export interface IUserState {
  user: User | undefined;
  isFetching: boolean;
  error: boolean;
}

// export interface UserActions extends Actions<IUserState> {
//   login(this: IUserState, username: string, password: string): void;
//   loginSucess(this: IUserState,user: User): void;
//   loginFail(this: IUserState,error: any): void;
//   updateUser(this: IUserState,username: string, age: number): void;
// }

export interface UserActions {
  login(username: string, password: string): void;
  loginSucess(user: User): void;
  loginFail(error: any): void;
  updateUser(username: string, age: number): void;
}

export const userModule: StateModule<IUserState, UserActions, [typeof HttpClient]> = {
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

    }
    // updateUser(username: string, age: number) {
    //   this.user = { username };
    //   console.log(username, age);
    // }
  },
  effects: {
    login(username: string, password: string) { // ofType(login)
      const [http] = this.deps;
      console.log(http);
      // console.log(username, password);
      // setTimeout
      // setTimeout(() => {
      //   // 上下文不一致
      // this.
      // return this.select(s => {
      //   return s.user!.username;
      // }).pipe(
      //   map(un => this.loginSucess({ username: 'lalalalal======>' + un + '===>' + username }))
      // )

      // }, 2000);
      // Observable
      // return of({ username: 'lalalalal' }).pipe(
      //   map(user => (this as any).loginSucess(user))
      // )
      // Promise
      return Promise.resolve(this.loginSucess({ username: 'lalalalal' })); // .then(() => )
    },
    loginSucess() {
      // this.
    },

  },
  effectsDeps: [HttpClient]
}

// userModule.actions
