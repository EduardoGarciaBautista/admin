import {createReducer, on} from '@ngrx/store';
import {setItems, unsetItems} from '@actions/entry-expsnes.actions';
import {EntryExpenseModel} from '@models/entry-expense.model';
import {AppState} from '@reducers/app.reducer';

export interface State {
  items: EntryExpenseModel[];
}

export interface AppStateWithEntry extends AppState {
  entry: State;
}

const initialState: State = {
  items: []
};


const _entryExpenseReducer = createReducer(initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unsetItems, state => ({...state, items: []}))
);

export function entryExpenseReducer(state, action) {
  return _entryExpenseReducer(state, action);
}
