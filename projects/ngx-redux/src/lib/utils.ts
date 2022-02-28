import { AnyAction } from 'redux';
// import { Actions } from "./store.service";
// export type Action = {
//   type: string;
//   [key: string]: any;
// }

import { StoreModuleConfig, StateModule } from "./models";

// export const createAction = (name: string, actions: Actions) => {
//   return Object.keys(actions).reduce<Action[]>((prev, key) => {
//     const fun = actions[key];
//     prev.push({
//       type: `[${name}] ${key}`
//     })
//     return prev
//   }, []);
// }



export const isFunction = (obj: any): obj is Function => {
  return typeof obj === 'function';
}

// export const getActionName = (fnName: string) => {
//   fnName.split()
// }


export const getActionType = (moduleName: string, fnOrName: Function | string) => {
  if (isFunction(fnOrName)) {
    return `[${moduleName}] ${fnOrName.name}`
  } else {
    // const methodNames = fnOrName
    return `[${moduleName}] ${fnOrName}`
  }
};

const regx = /^\[([a-zA-Z0-9]{0,})\]/;

export const getModuleName = (actionType: string) => {
  // const moduleName = regx.exec(action.type);
  const [, moduleName] = actionType.toLowerCase().match(regx)! || [];
  return moduleName;
}


// export const isStateModule = <S>(config: StoreModuleConfig<S>): config is StateModule<S, Actions<S>> => {
//   // if (!Array.isArray(config) && !!config.name && !!config.state && !!config.actions) {
//   //   return true
//   // }
//   // return false;
//   return false;
// }

// export const isStoreModuleConfig = (config: StoreModuleConfig): config is StoreModuleConfig => {
//   if (!Array.isArray(config) ) {
//     const [anyKey] = Object.keys(config);
//     const stateModuleConfig =  (config as any)[anyKey];
//     if  (isStateModule(stateModuleConfig)) {
//       return true;
//     }
//   }
//   return false;
// }
