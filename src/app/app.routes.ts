import { UIRouter } from '@uirouter/angular';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashComponent } from './components/dash/dash.component';

/**
 * App router routes
 */
export const Routes: any[] = [{
  name: 'main',
  url: '/:id',
  component: MainComponent
}, {
  name: 'dash',
  url: '/dash',
  component: DashComponent
}, {
  name: 'sign-in',
  url: '/sign-in',
  component: SignInComponent
}, {
  name: 'sign-up',
  url: '/sign-up',
  component: SignUpComponent
}];

/**
 * App router config
 */
export function uiRouterConfigFn(router: UIRouter) {
  router.urlService.rules.otherwise({ state: 'main' });
}
