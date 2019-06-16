import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationSettingComponent } from './organization-setting.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormAddModule } from '../../../shared/form-add/form-add.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: OrganizationSettingComponent
}];

@NgModule({
  declarations: [OrganizationSettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormAddModule,
    FormsModule
  ]
})
export class OrganizationSettingModule {
}
