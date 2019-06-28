import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card.component';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';

const routes: Routes = [{
  path: '',
  component: CardComponent
}];

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PopoverModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class CardModule {
}
