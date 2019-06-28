import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight, faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { NgDatePipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routes';
import { CardNewComponent } from './components/dash/card-new/card-new.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ApiService } from './services/api/api.service';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    CardNewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NgDatePipesModule,
    AppRoutesModule,
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
