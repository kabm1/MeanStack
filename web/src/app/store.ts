import { User } from './tabular/allusers/types';
import { LOGIN } from './services/user.service';

export interface AppState {
  user: User;
}

export interface Action {
  type: string,
  payload: any;
}

export const INITIAL_STATE: AppState = {
  user: null
}

export function rootReducer(state: AppState = INITIAL_STATE, action: Action): AppState {
  switch (action.type) {
    case LOGIN: return {
        ...state,
        user: action.payload
      };

    default: return state;
  }
}
