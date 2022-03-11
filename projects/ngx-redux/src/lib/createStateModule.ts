// import { HttpClient } from '@angular/common/http';
// import { FormBuilder } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { StateModule } from "./models";


// export function createStateModule<S, A = { [K: string]: Function }, D = object[]>(
//   name: string,
//   state: S,
//   actions: A & ThisType<S>,
//   effects: {
//     [K in keyof A]?: Function;// & ReturnType<void | Promise<void> | Observable<void>>
//   } & ThisType<
//     {
//       deps: { [K in keyof D]: D[K] extends new (...args: any) => infer I ? I : never }
//     }>, // & ReturnType<void | Promise<void> | Observable<void>>
//   effectsDeps: D
// ): StateModule<S, A, D> {
//   return {
//     name,
//     state,
//     actions,
//     effects,
//     effectsDeps // : [] as const
//   }
// }



// const x = createStateModule(
//   '111',
//   { name: 'kevin' },
//   {
//     login() {
//       // this
//     },
//   },
//   {
//     login() {
//       // this.deps
//     }
//     // login() {

//     // }
//     // login() {
//     //   const [] = this.deps
//     // }

//   },
//   [HttpClient, FormBuilder]
// )
