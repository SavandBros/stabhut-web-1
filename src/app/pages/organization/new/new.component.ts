import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiError } from '@app/interfaces/api-error';
import { Column } from '@app/interfaces/column';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  errors: ApiError = {};

  organization: Organization;

  constructor(private api: ApiService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submit(): void {
    this.loading = true;
    this.api.createOrganization(this.form.get('name').value).subscribe((organization: Organization): void => {
      this.loading = false;
      this.organization = organization;
      this.api.createProject(organization.id, 'Default').subscribe((project: Project): void => {
        this.api.createChat({
          project: project.id,
          content: 'I just created this awesome organization!',
        }).subscribe();
        this.api.createTask({
          project: project.id,
          content: 'Setup this organization',
        }).subscribe();
        this.api.createColumn({ project: project.id, order: 0, name: 'Ready' }).subscribe((column: Column): void => {
          this.api.createCard({
            column: column.id,
            title: 'Hey, I\'m a sample card here. Do whatever you want with me.',
            content: 'Here\'s a placeholder card content.'
          }).subscribe();
        });
        this.api.createColumn({ project: project.id, order: 1, name: 'In Progress' }).subscribe();
        this.api.createColumn({ project: project.id, order: 2, name: 'Needs Review' }).subscribe();
        this.api.createColumn({ project: project.id, order: 3, name: 'Done' }).subscribe();
      });
    }, (error: HttpErrorResponse): void => {
      this.loading = false;
      this.errors = error.error;
    });
  }
}
