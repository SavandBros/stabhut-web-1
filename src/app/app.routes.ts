import { DashComponent } from './components/dash/dash.component';
import { OrganizationComponent } from './components/dash/organization/organization.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/dash/card/card.component';
import { OrganizationSettingComponent } from './components/dash/organization-setting/organization-setting.component';

/**
 * App router routes
 */
// export const Routes: Ng2StateDeclaration[] = [{
//   name: 'sign-in',
//   url: '/sign-in',
//   component: SignInComponent,
// }, {
//   name: 'sign-up',
//   url: '/sign-up',
//   component: SignUpComponent,
// }, {
//   name: 'dash',
//   url: '/',
//   component: DashComponent,
// }, {
//   name: 'organization',
//   url: '/:id/:project',
//   component: OrganizationComponent,
//   params: {
//     project: {
//       dynamic: true,
//     },
//   },
// }, {
//   name: 'card',
//   url: '/card/:id',
//   component: CardComponent,
// }, {
//   name: 'organization-setting',
//   url: '/organization/:id',
//   component: OrganizationSettingComponent,
//   params: {
//     id: {
//       dynamic: true,
//     },
//   },
// }];
const routes: Routes = [{
  path: 'sign-in',
  component: SignInComponent,
}, {
  path: 'sign-up',
  component: SignUpComponent,
}, {
  path: 'dash',
  loadChildren: './components/dash/dash.module#DashModule',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {
}
