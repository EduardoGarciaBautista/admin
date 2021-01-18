import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntryExpenseService} from '@services/entry-expense.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '@reducers/app.reducer';
import {Subscription} from 'rxjs';
import * as ui from '../../../actions/ui.actions';

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styles: []
})
export class EntryExitComponent implements OnInit, OnDestroy {

  entryForm: FormGroup;
  type = 'entry';
  subscription: Subscription;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private entry: EntryExpenseService,
              private store: Store<AppState>) {
    this.createForm();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
      .subscribe(({isLoading}) => this.isLoading = isLoading
    );
  }

  createForm(): void {
    this.entryForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  save(): void {
    if (this.entryForm.valid) {
      this.store.dispatch(ui.isLoading());
      this.entry.createEntry({...this.entryForm.value, type: this.type})
        .then(ref => {
          Swal.fire('Registro creado', this.entryForm.value.description, 'success')
            .then(() => {
              this.entryForm.reset();
              this.store.dispatch(ui.stopLoading());
            });
        })
        .catch(err => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire('Error en el registro', err.message, 'error');
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
