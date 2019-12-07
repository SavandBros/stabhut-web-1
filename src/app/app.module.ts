import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { CardNewComponent } from '@app/pages/dash/card-new/card-new.component';
import { SignInComponent } from '@app/pages/sign-in/sign-in.component';
import { SignUpComponent } from '@app/pages/sign-up/sign-up.component';
import { ApiInterceptorService } from '@app/services/api-interceptor.service';
import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight, faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CookieService } from 'ngx-cookie-service';
import { NgDatePipesModule } from 'ngx-pipes';

const routes: Routes = [{
  path: 'sign-in',
  component: SignInComponent,
}, {
  path: 'sign-up',
  component: SignUpComponent,
}, {
  path: 'dash',
  loadChildren: () => import('@app/pages/dash/dash.module').then(m => m.DashModule),
}, {
  path: '**',
  redirectTo: 'dash',
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    CardNewComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NgDatePipesModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
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
  entryComponents: [
    CardNewComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(
      faPlus,
      faTrash,
      faCog,
      faArrowCircleRight,
    );
  }
}
