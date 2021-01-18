import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@reducers/app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  name = '';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .subscribe(({user}) => {
        this.name = user?.name;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
