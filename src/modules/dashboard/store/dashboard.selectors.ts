import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardStateInterface } from '../models/contacts.adapter.interface';
import { dashboardAdapter } from './dashboard.adapter';

export const selectDashboardState = createFeatureSelector<DashboardStateInterface>(
  'dashboard'
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state: DashboardStateInterface) => state.loading
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = dashboardAdapter.getSelectors(selectDashboardState);

export const selectFavoritedContacts = createSelector(selectAll, (contacts) =>
  contacts.filter((contact) => {
    return contact.favorite;
  })
);
