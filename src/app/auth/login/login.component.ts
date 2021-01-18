import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.uiSubscription = this.store.select('ui').subscribe(value => {
      this.loading = value.isLoading;
      console.log('LOADING', this.loading);
    });
  }

  login(): void {
    const {email, password} = this.loginForm.value;

    this.store.dispatch(ui.isLoading());
    /*Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading();
      },
    });*/

    this.authService.loginUser(email, password)
      .then(result => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());

        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
