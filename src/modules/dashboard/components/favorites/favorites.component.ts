import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { selectFavoritedContacts } from '../../store/dashboard.selectors';
import { DashboardStateInterface } from '../../models/contacts.adapter.interface';
import { Store } from '@ngrx/store';
import { ContactInterface } from '../../models/contactInterface';
import { ContactsCrudMethodsClass } from '../../models/contacts-crud-methods.class';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent
  extends ContactsCrudMethodsClass
  implements OnInit, OnDestroy {
  public allDataSource: ContactInterface[];

  private favoritedContacts$ = this.store$.select(selectFavoritedContacts);

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
    this.favoritedContacts$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((contacts) => {
        this.dataSource = contacts;
      });
    this.contacts$.pipe(takeUntil(this.unsubscriber$)).subscribe((contacts) => {
      this.allDataSource = contacts;
    });
    this.loading$.pipe(takeUntil(this.unsubscriber$)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
