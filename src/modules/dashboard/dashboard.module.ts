import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UiMaterialComponentsModule } from '../ui-material-components/ui-material-components.module';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffectsService } from './store/dashboard.effects';
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { AddToFavoriteComponent } from './components/add-to-favorite/add-to-favorite.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    FavoritesComponent,
    ContactsPageComponent,
    ContactsFormComponent,
    ContactsTableComponent,
    AddToFavoriteComponent,
  ],
  imports: [
    DashboardRoutingModule,
    UiMaterialComponentsModule,
    SharedModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffectsService]),
    ReactiveFormsModule,
  ],
  bootstrap: [DashboardPageComponent],
})
export class DashboardModule {}
