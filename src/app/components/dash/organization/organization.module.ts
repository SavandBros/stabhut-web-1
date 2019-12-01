import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: ':project',
  component: OrganizationComponent,
}];

@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    FormsModule,
  ],
})
export class OrganizationModule {
}
