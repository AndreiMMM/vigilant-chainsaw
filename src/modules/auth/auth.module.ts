import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UiMaterialComponentsModule } from '../ui-material-components/ui-material-components.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    UiMaterialComponentsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
