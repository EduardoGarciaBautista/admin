import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducers';
import * as entry from './entry-exit/entry-expense.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  entry: entry.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  entry: entry.entryExpenseReducer
};

