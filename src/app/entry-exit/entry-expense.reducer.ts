import {createReducer, on} from '@ngrx/store';
import {setItems, unsetItems} from './entry-expsnes.actions';
import {EntryExpenseModel} from '../models/entry-expense.model';

export interface State {
  items: EntryExpenseModel[];
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
