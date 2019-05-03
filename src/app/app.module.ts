import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight, faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UIRouterModule } from '@uirouter/angular';
import { ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { NgDatePipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { Routes, uiRouterConfigFn } from './app.routes';
import { CardNewComponent } from './components/card-new/card-new.component';
import { CardComponent } from './components/card/card.component';
import { DashComponent } from './components/dash/dash.component';
import { OrganizationComponent } from './components/main/organization.component';
import { OrganizationSettingComponent } from './components/organization-setting/organization-setting.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ApiService } from './services/api/api.service';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationComponent,
    SignInComponent,
    SignUpComponent,
    DashComponent,
    CardNewComponent,
    CardComponent,
    OrganizationSettingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NgDatePipesModule,
    UIRouterModule.forRoot({
      states: Routes,
      config: uiRouterConfigFn
    }),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    ApiService,
    AuthService,
  ],
  entryComponents: [
    CardNewComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faPlus);
    library.add(faTrash);
    library.add(faCog);
    library.add(faArrowCircleRight);
  }
}
