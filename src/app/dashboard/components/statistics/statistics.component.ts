import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {EntryExpenseModel} from '@models/entry-expense.model';
import {Subscription} from 'rxjs';
import {Label, MultiDataSet} from 'ng2-charts';
import {AppStateWithEntry} from '@reducers/entry-expense.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy {

  entries = 0;
  expenses = 0;

  totalEntries = 0;
  totalExpenses = 0;

  subscription: Subscription;

  doughnutChartLabels: Label[] = ['Entries', 'Expenses'];
  doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithEntry>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('entry')
      .subscribe(({items}) => {
        this.generateStats(items);
      });
  }

  generateStats(items: EntryExpenseModel[]): void {

    this.totalExpenses = 0;
    this.totalEntries = 0;

    items.forEach(item => {
      if (item.type === 'entry') {
        this.totalEntries += item.amount;
        this.entries++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses++;
      }
    });
    this.doughnutChartData = [[this.totalEntries, this.totalExpenses]];
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
