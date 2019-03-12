import { UIRouter } from '@uirouter/angular';
import { MainComponent } from './components/main/main.component';

/**
 * App router routes
 */
export const Routes: object[] = [{
  name: 'main',
  url: '/',
  component: MainComponent
}];

/**
 * App router config
 */
export function uiRouterConfigFn(router: UIRouter) {
  router.urlService.rules.otherwise({ state: 'main' });
}
