import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UIRouterModule } from '@uirouter/angular';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashComponent } from './components/dash/dash.component';
import { Routes, uiRouterConfigFn } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,
    DashComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    UIRouterModule.forRoot({
      states: Routes,
      config: uiRouterConfigFn
    }),
    TooltipModule.forRoot(),
  ],
  providers: [
    ApiService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faUser);
    library.add(faCog);
  }
}
