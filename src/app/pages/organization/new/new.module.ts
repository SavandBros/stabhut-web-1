import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NewComponent } from './new.component';

const routes: Routes = [{
  path: '',
  component: NewComponent,
}];

@NgModule({
  declarations: [
    NewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
  ],
})
export class NewModule {
}
