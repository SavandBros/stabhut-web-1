import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MarkdownModule } from 'ngx-markdown/';

import { CardModalComponent } from './card-modal.component';

@NgModule({
  declarations: [
    CardModalComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    MarkdownModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CardModalComponent,
  ],
})
export class CardModalModule {
}
