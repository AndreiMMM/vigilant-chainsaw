import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { UiMaterialComponentsModule } from '../ui-material-components/ui-material-components.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [SharedModule, UiMaterialComponentsModule, HomeRoutingModule],
})
export class HomeModule {}
