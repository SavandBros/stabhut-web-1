import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CardModalModule } from '@app/shared/card-modal/card-modal.module';
import { CardNewModule } from '@app/shared/card-new/card-new.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProjectComponent } from './project.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent,
}];

@NgModule({
  declarations: [
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FontAwesomeModule,
    CardModalModule,
    CardNewModule,
    DragDropModule,
  ],
})
export class ProjectModule {
}
