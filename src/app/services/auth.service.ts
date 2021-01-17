import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private aFirestore: AngularFirestore) {
  }

  initAuthListener(): void {
    this.auth.authState.subscribe(user => {
      console.log(user);
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
}
