import { Action } from '@s';

export interface State {
  username: string;
  [key: string]: any;
}

export const initialState: State = {
  username: 'kevin'
}

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'update_user':
      return { username: '123123123' }
    default:
      return state;
  }
}
