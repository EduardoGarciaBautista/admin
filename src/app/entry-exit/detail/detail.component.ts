import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {EntryExpenseModel} from '../../models/entry-expense.model';
import {Subscription} from 'rxjs';
import {EntryExpenseService} from '../../services/entry-expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  entryExpense: EntryExpenseModel[] = [];
  subscription: Subscription;

  constructor(private store: Store<AppState>,
              private entryService: EntryExpenseService) {
  }

  ngOnInit(): void {
    this.subscription =
      this.store.select('entry')
        .subscribe(({items}) => {
          this.entryExpense = items;
        });
  }

  erase(uid: string): void {
    this.entryService.deleteItemByUid(uid)
      .then(() => Swal.fire('Eliminado', 'Se elimino correctamente.', 'success'))
      .catch(err => Swal.fire('Eliminado', err.message, 'error'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
