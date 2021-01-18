import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {EntryExpenseModel} from '@models/entry-expense.model';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryExpenseService {

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
  }

  createEntry(entryExpense: EntryExpenseModel): Promise<any> {
    delete entryExpense.uid;
    return this.afs.doc(`${this.authService.user.uid}/entry-expense`).collection('items')
      .add(entryExpense);
  }

  initEntryExpenseListener(uid: string): Observable<EntryExpenseModel[]> {
    return this.afs.collection(`${uid}/entry-expense/items`)
      .snapshotChanges()
      .pipe(
        map(object =>
          object.map(doc =>
            ({...doc.payload.doc.data() as EntryExpenseModel, uid: doc.payload.doc.id})))
      );
  }

  deleteItemByUid(uidItem): Promise<void> {
    const uid = this.authService.user.uid;
    return this.afs.doc(`${uid}/entry-expense/items/${uidItem}`).delete();
  }
}
