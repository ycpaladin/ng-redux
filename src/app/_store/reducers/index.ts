import { combineReducers } from '@s';
import { State, reducer} from './user.reducer';

export interface RootState {
  user: State
}

export const rootReducers = combineReducers<RootState>({
  user: reducer as any
})
