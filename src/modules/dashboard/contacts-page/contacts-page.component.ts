import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PhonePipe } from '../../../shared/pipes/phone-formatter.pipe';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardStateInterface } from '../../models/contacts.adapter.interface';
import { ContactInterface } from '../../models/contactInterface';
import * as DashboardSelectors from '../../store/dashboard.selectors';
import * as DashboardActions from '../../store/dashboard.actions';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { selectDashboardLoading } from '../../store/dashboard.selectors';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css'],
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  public loading = true;
  public dataSource: ContactInterface[];

  private contacts$: Observable<any> = this.store$.select(
    DashboardSelectors.selectAll
  );

  private loading$ = this.store$.select(selectDashboardLoading);

  private unsubscriber$: Subject<void> = new Subject<void>();

  constructor(private readonly store$: Store<DashboardStateInterface>) {
    this.store$.dispatch(new DashboardActions.LoadContacts());
  }

  public ngOnInit(): void {
    this.fetchStore();
  }

  public ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public onDelete(contact: ContactInterface): void {
    this.store$.dispatch(new DashboardActions.Delete(contact.id));
  }

  public onUpdate(contact: ContactInterface): void {
    this.store$.dispatch(new DashboardActions.Update(contact));
  }

  public onAdd(contact: ContactInterface): void {
    this.store$.dispatch(new DashboardActions.Add(contact));
  }

  private fetchStore(): void {
    this.contacts$.pipe(takeUntil(this.unsubscriber$)).subscribe((contacts) => {
      this.dataSource = contacts;
    });
    this.loading$.pipe(takeUntil(this.unsubscriber$)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
