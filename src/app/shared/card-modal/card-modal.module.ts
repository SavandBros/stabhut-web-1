import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from '@app/shared/card-modal/card-modal.component';
import { TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MarkdownModule } from 'ngx-markdown';



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
  ],
  entryComponents: [
    CardModalComponent,
  ],
})
export class CardModalModule { }
