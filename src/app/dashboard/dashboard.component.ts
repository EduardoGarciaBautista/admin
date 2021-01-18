import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {EntryExpenseService} from '../services/entry-expense.service';
import {setItems} from '../actions/entry-expsnes.actions';
import {AppState} from '../reducers/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private entry: EntryExpenseService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth')
        .pipe(
          filter(({user}) => user !== null)
        )
        .subscribe(({user}) => {
          this.subscriptions.push(
            this.entry.initEntryExpenseListener(user.uid)
              .subscribe(entries => {
                this.store.dispatch(setItems({items: entries}));
              }));
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
