import { StateModule } from "./models";


export function mergeState(module: StateModule<any>[]) {
  const initialState = module.reduce((prev, curr) => {
    prev[curr.name] = curr.state;
    return prev;
  }, {} as { [key in string]: any })
  return initialState;
}
