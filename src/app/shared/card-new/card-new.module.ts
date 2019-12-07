import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CardNewComponent } from './card-new.component';

@NgModule({
  declarations: [
    CardNewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [
    CardNewComponent,
  ],
})
export class CardNewModule {
}
