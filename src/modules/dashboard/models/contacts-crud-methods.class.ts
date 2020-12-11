import { ContactInterface } from './contactInterface';
import * as DashboardActions from '../store/dashboard.actions';
import { DashboardStateInterface } from './contacts.adapter.interface';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as DashboardSelectors from '../store/dashboard.selectors';
import { selectDashboardLoading } from '../store/dashboard.selectors';

export class ContactsCrudMethodsClass {
  public loading = true;
  public dataSource: ContactInterface[];

  protected unsubscriber$: Subject<void> = new Subject<void>();
  protected loading$ = this.store$.select(selectDashboardLoading);
  protected contacts$: Observable<any> = this.store$.select(
    DashboardSelectors.selectAll
  );
  constructor(protected store$: Store<DashboardStateInterface>) {
    this.store$.dispatch(new DashboardActions.LoadContacts());
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
}
