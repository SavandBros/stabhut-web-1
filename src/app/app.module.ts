import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { ApiInterceptorService } from '@app/services/api-interceptor.service';
import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';
import { CardModalComponent } from '@app/shared/card-modal/card-modal.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { BsDropdownModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule } from 'ngx-markdown';

const routes: Routes = [{
  path: 'sign-in',
  loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule),
}, {
  path: 'sign-up',
  loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),
}, {
  path: 'organization',
  loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule),
}, {
  path: '**',
  redirectTo: 'organization',
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
    AppComponent,
    CardModalComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
    CookieService,
    ApiService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(
      faPlus,
      faTrash,
      faCog,
      faComment,
      faArrowCircleRight,
    );
  }
}
