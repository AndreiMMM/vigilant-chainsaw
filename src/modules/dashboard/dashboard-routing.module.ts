import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'contacts',
        component: ContactsPageComponent,
      },

      {
        path: 'favorites',
        component: FavoritesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('dashboard', {}),
    EffectsModule.forFeature([]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
