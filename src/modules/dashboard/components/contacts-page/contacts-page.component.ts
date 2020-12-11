import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardStateInterface } from '../../models/contacts.adapter.interface';
import { takeUntil } from 'rxjs/operators';
import { ContactsCrudMethodsClass } from '../../models/contacts-crud-methods.class';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css'],
})
export class ContactsPageComponent
  extends ContactsCrudMethodsClass
  implements OnInit, OnDestroy {
  constructor(protected readonly store$: Store<DashboardStateInterface>) {
    super(store$);
  }

  public ngOnInit(): void {
    this.fetchStore();
  }

  public ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
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
