
export type Action = {
  type: string;
  [key: string]: any;
}
export type Reducer<S = State> = (state: S, action: Action) => S;
// export type ReducerFunc
export type Reducers = { [key: string]: Reducer };

export type State = { [key: string]: any }

export interface Store<S> {
  getState(): S,
  dispatch(action: Action): void;
}

export type Listener = (state: any) => void
