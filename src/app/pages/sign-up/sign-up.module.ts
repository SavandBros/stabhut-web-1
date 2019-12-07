import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './sign-up.component';

const routes: Routes = [{
  path: '',
  component: SignUpComponent,
}];

@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class SignUpModule {
}
