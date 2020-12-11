import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {
  selectDashboardLoading,
  selectFavoritedContacts,
} from '../../store/dashboard.selectors';
import { DashboardStateInterface } from '../../models/contacts.adapter.interface';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../store/dashboard.actions';
import { ContactInterface } from '../../models/contactInterface';
import * as DashboardSelectors from '../../store/dashboard.selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public loading = true;
  public dataSource: ContactInterface[];
  public allDataSource: ContactInterface[];

  private unsubscriber$: Subject<void> = new Subject<void>();
  private loading$ = this.store$.select(selectDashboardLoading);
  private favoritedContacts$ = this.store$.select(selectFavoritedContacts);
  private contacts$: Observable<any> = this.store$.select(
    DashboardSelectors.selectAll
  );
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
