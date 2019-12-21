import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';

import { CardComponent } from 'src/app/pages/organization/card/card.component';

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
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class CardModule {
}
