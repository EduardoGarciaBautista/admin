import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

import {Store} from '@ngrx/store';
import {AppState} from '@reducers/app.reducer';
import {Subscription} from 'rxjs';

import * as ui from '../../actions/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  uiSubscriptions: Subscription;
  registerForm: FormGroup;
  isLoading = false;

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscriptions = this.store.select('ui')
      .subscribe(({isLoading}) => this.isLoading = isLoading);
  }

  createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const {name, email, password} = this.registerForm.value;
    this.store.dispatch(ui.isLoading());
    /*Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading();
      },
    });*/
    this.authService.createUser(name, email, password)
      .then(credentials => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
        console.log(credentials);
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  ngOnDestroy(): void {
    this.uiSubscriptions.unsubscribe();
  }

}
