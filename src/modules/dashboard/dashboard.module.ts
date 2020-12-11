import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './component/dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UiMaterialComponentsModule } from '../ui-material-components/ui-material-components.module';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { ContactsPageComponent } from './component/contacts-page/contacts-page.component';
import { SharedModule } from '../shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { dashboardReducer } from './store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffectsService } from './store/dashboard.effects';
import { ContactsFormComponent } from './component/contacts-form/contacts-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsTableComponent } from './component/contacts-table/contacts-table.component';
import { AddToFavoriteComponent } from './component/add-to-favorite/add-to-favorite.component';

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
