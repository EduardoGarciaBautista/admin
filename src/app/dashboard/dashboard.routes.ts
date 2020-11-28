import {Routes} from '@angular/router';
import {StatisticsComponent} from '../entry-exit/statistics/statistics.component';
import {EntryExitComponent} from '../entry-exit/entry-exit.component';
import {DetailComponent} from '../entry-exit/detail/detail.component';

export const dashboardRoutes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'entries', component: EntryExitComponent},
  {path: 'detail', component: DetailComponent},
];
