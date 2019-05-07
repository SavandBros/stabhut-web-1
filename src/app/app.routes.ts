import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';

import { CardComponent } from './components/card/card.component';
import { OrganizationSettingComponent } from './components/organization-setting/organization-setting.component';
import { DashComponent } from './components/dash/dash.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

/**
 * App router routes
 */
export const Routes: Ng2StateDeclaration[] = [{
  name: 'sign-in',
  url: '/sign-in',
  component: SignInComponent,
}, {
  name: 'sign-up',
  url: '/sign-up',
  component: SignUpComponent,
}, {
  name: 'dash',
  url: '/',
  component: DashComponent,
}, {
  name: 'organization',
  url: '/:id/:project',
  component: OrganizationComponent,
  params: {
    project: {
      dynamic: true,
    },
  },
}, {
  name: 'card',
  url: '/card/:id',
  component: CardComponent,
}, {
  name: 'organization-setting',
  url: '/organization/:id',
  component: OrganizationSettingComponent,
  params: {
    id: {
      dynamic: true,
    },
  },
}];

/**
 * App router config
 */
export function uiRouterConfigFn(router: UIRouter) {
  router.urlService.rules.otherwise({ state: 'main' });
}
