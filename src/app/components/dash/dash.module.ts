import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: DashComponent,
  children: [{
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  }, {
    path: 'organization/:id',
    loadChildren: './organization/organization.module#OrganizationModule'
  }, {
    path: 'card/:id',
    loadChildren: './card/card.module#CardModule',
  }, {
    path: 'organization/:id/settings',
    loadChildren: './organization-setting/organization-setting.module#OrganizationSettingModule',
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }]
}];

@NgModule({
  declarations: [DashComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashModule {
}
