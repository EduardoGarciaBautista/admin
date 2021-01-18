import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {EntryExitComponent} from './components/entry-exit/entry-exit.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {DetailComponent} from './components/detail/detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EntryOrderPipe} from './pipes/entry-order.pipe';
import {ChartsModule} from 'ng2-charts';
import {StoreModule} from '@ngrx/store';
import {entryExpenseReducer} from '@reducers/entry-expense.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    EntryExitComponent,
    StatisticsComponent,
    DetailComponent,
    EntryOrderPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forFeature('entry', entryExpenseReducer),
  ]
})
export class DashboardModule {
}
