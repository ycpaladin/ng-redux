import { Actions } from "./store.service";
export type Action = {
  type: string;
  [key: string]: any;
}

export const createAction = (name: string, actions: Actions) => {
  return Object.keys(actions).reduce<Action[]>((prev, key) => {
    const fun = actions[key];
    prev.push({
      type: `[${name}] ${key}`
    })
    return prev
  }, []);
}



export const isFunction = (obj: any): obj is Function => {
  return typeof obj === 'function';
}
