import {Pipe, PipeTransform} from '@angular/core';
import {EntryExpenseModel} from '../models/entry-expense.model';

@Pipe({
  name: 'entryOrder'
})
export class EntryOrderPipe implements PipeTransform {

  transform(entries: EntryExpenseModel[]): EntryExpenseModel[] {
    return entries = entries.slice().sort((a, b) => {
      if (a.type === 'entry') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
