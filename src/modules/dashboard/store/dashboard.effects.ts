import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import * as ContactActions from './dashboard.actions';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactsApiService } from '../services/contacts-api.service';
import { ContactInterface } from '../models/contactInterface';

@Injectable()
export class DashboardEffectsService {
  constructor(
    private actions$: Actions,
    private contactsService: ContactsApiService,
    public snackBar: MatSnackBar
  ) {}

  DASHBOARD_ACTIONS_SUCCESS = [
    ContactActions.DashboardActionTypes.ADD_SUCCESS,
    ContactActions.DashboardActionTypes.UPDATE_SUCCESS,
    ContactActions.DashboardActionTypes.DELETE_SUCCESS,
    ContactActions.DashboardActionTypes.LOAD_CONTACTS_SUCCESS,
  ];

  DASHBOARD_ACTIONS_FAILED = [
    ContactActions.DashboardActionTypes.ADD_FAILED,
    ContactActions.DashboardActionTypes.UPDATE_FAILED,
    ContactActions.DashboardActionTypes.DELETE_FAILED,
    ContactActions.DashboardActionTypes.LOAD_CONTACTS_FAILED,
  ];

  @Effect()
  public loadAllContacts$: Observable<any> = this.actions$.pipe(
    ofType(ContactActions.DashboardActionTypes.LOAD_CONTACTS),
    switchMap(() =>
      this.contactsService.getAll().pipe(
        delay(1500),
        map((contacts) => new ContactActions.LoadContactsSuccess(contacts)),
        catchError((error) => of(new ContactActions.LoadContactsFailed(error)))
      )
    )
  );

  @Effect()
  addContact$: Observable<any> = this.actions$.pipe(
    ofType(ContactActions.DashboardActionTypes.ADD),
    switchMap((action: any) =>
      this.contactsService.add(action.contact).pipe(
        delay(1500),
        map(
          (contact: ContactInterface) => new ContactActions.AddSuccess(contact)
        ),
        catchError((error) => of(new ContactActions.AddFailed(error)))
      )
    )
  );

  @Effect()
  deleteContact$: Observable<any> = this.actions$.pipe(
    ofType(ContactActions.DashboardActionTypes.DELETE),
    switchMap(({ id }) =>
      this.contactsService.delete(id).pipe(
        delay(1500),
        map(() => new ContactActions.DeleteSuccess(id)),
        catchError((error) => of(new ContactActions.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  updateContact$: Observable<any> = this.actions$.pipe(
    ofType(ContactActions.DashboardActionTypes.UPDATE),
    switchMap(({ contact }) =>
      this.contactsService.update(contact).pipe(
        delay(1500),
        map(() => new ContactActions.UpdateSuccess(contact)),
        catchError((error) => of(new ContactActions.UpdateFailed(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  successNotification$ = this.actions$.pipe(
    ofType(...this.DASHBOARD_ACTIONS_SUCCESS),
    tap(() =>
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: 2000,
      })
    )
  );
  @Effect({ dispatch: false })
  failedNotification$ = this.actions$.pipe(
    ofType(...this.DASHBOARD_ACTIONS_FAILED),
    tap(() =>
      this.snackBar.open('FAILED', 'Operation failed', {
        duration: 2000,
      })
    )
  );
}
