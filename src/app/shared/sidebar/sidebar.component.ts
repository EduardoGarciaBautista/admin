import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@reducers/app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  name = '';

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .subscribe(({user}) => {
        this.name = user?.name;
      });
  }

  logOut(): void {
    this.authService.logOut().then(() => {
      this.router.navigate(['/auth']);
    })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
