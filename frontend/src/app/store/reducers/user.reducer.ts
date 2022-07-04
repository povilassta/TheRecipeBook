import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { set, reset } from '../actions/user.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: State = localStorage.getItem('user')
  ? {
      isAuthenticated: true,
      user: JSON.parse(localStorage.getItem('user') || ''),
    }
  : {
      isAuthenticated: false,
      user: null,
    };

export const userReducer = createReducer(
  initialState,
  on(set, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
  })),
  on(reset, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }))
);
