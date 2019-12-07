import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';

import { CardComponent } from './card.component';

const routes: Routes = [{
  path: '',
  component: CardComponent,
}];

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
  ],
})
export class CardModule {
}
