import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: DashComponent,
  children: [{
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  }, {
    path: 'organization/:id',
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
  }, {
    path: 'card/:id',
    loadChildren: () => import('./card/card.module').then(m => m.CardModule),
  }, {
    path: 'organization/:id/settings',
    loadChildren: () => import('./organization-setting/organization-setting.module').then(m => m.OrganizationSettingModule),
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }],
}];

@NgModule({
  declarations: [DashComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class DashModule {
}
