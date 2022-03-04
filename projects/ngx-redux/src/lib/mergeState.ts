import { StateModule } from "./models";


export function mergeState<S>(module: StateModule<S> | StateModule<S>[]) {
  if (Array.isArray(module)) {
    const initialState = module.reduce((prev, curr) => {
      prev[curr.name] = curr.state;
      return prev;
    }, {} as { [key: string]: any })
    return initialState;
  } else {
    return {
      [module.name]: module.state
    };
  }
}
