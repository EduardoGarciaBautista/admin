import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {EntryExitComponent} from './components/entry-exit/entry-exit.component';
import {DetailComponent} from './components/detail/detail.component';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../guards/auth.guard';

export const dashboardRoutingModule: Routes = [
  {
    path: '', component: DashboardComponent,  canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'stats'},
      {path: 'stats', component: StatisticsComponent},
      {path: 'entries', component: EntryExitComponent},
      {path: 'detail', component: DetailComponent},
    ]
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];
@NgModule({
  imports: [RouterModule.forChild(dashboardRoutingModule)],
  exports: [RouterModule]
})

export class DashboardRoutingModule{
}
