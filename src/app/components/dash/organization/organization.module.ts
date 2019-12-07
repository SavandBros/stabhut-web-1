import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { OrganizationComponent } from './organization.component';

const routes: Routes = [{
  path: ':project',
  component: OrganizationComponent,
}];

@NgModule({
  declarations: [
    OrganizationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
  ],
})
export class OrganizationModule {
}
