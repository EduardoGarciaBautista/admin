import {ActionReducerMap} from '@ngrx/store';
import * as ui from './ui.reducer';
import * as auth from './auth.reducers';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
};

