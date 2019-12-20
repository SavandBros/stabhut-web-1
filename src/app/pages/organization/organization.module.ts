import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { OrganizationComponent } from './organization.component';

const routes: Routes = [{
  path: '',
  component: OrganizationComponent,
  children: [{
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  }, {
    path: 'new',
    loadChildren: () => import('./new/new.module').then(m => m.NewModule),
  }, {
    path: ':id/card/:card',
    loadChildren: () => import('./card/card.module').then(m => m.CardModule),
  }, {
    path: ':id/settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  }, {
    path: ':id',
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
  }, {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }],
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
