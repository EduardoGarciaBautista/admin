import {createAction, props} from '@ngrx/store';
import {EntryExpenseModel} from '../models/entry-expense.model';

export const setItems = createAction('[Entry Expense] Set Items',
  props<{items: EntryExpenseModel[]}>());

export const unsetItems = createAction('[Entry Expense] Unset Items');

