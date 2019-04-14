import { UIRouter } from '@uirouter/angular';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashComponent } from './components/dash/dash.component';
import { MainComponent } from './components/main/main.component';
import { CardComponent } from './components/card/card.component';

/**
 * App router routes
 */
export const Routes: any[] = [{
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
  name: 'main',
  url: '/:id',
  component: MainComponent,
}, {
  name: 'card',
  url: '/card/:id',
  component: CardComponent,
}];

/**
 * App router config
 */
export function uiRouterConfigFn(router: UIRouter) {
  router.urlService.rules.otherwise({ state: 'main' });
}
