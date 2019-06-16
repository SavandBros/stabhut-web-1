import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddComponent } from './form-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FormAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [FormAddComponent]
})
export class FormAddModule {
}
