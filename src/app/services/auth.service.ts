import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {setUser, unsetUser} from '../auth/auth.actions';
import {unsetItems} from '../entry-exit/entry-expsnes.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscription: Subscription;
  private _user: UserModel;

  constructor(private auth: AngularFireAuth,
              private aFirestore: AngularFirestore,
              private store: Store<AppState>) {
  }

  initAuthListener(): void {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.subscription = this.aFirestore.doc(`${user.uid}/users`).valueChanges()
          .subscribe((userData: UserModel) => {
            this._user = userData;
            this.store.dispatch(setUser({user: userData}));
          });
      } else {

        this.subscription?.unsubscribe();
        this._user = null;
        this.store.dispatch(unsetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }


  createUser(name: string, email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser: UserModel = {
          uid: user.uid,
          name,
          email
        };

        return this.aFirestore.doc(`${user.uid}/users`).set(newUser);
      });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(): Promise<any> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState
      .pipe(
        map(user => user !== null)
      );
  }

  get user(): UserModel {
    return {...this._user};
  }
}
