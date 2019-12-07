import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormAddModule } from '@app/shared/form-add/form-add.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SettingsComponent } from './settings.component';

const routes: Routes = [{
  path: '',
  component: SettingsComponent,
}];

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormAddModule,
    FormsModule,
  ],
})
export class SettingsModule {
}
