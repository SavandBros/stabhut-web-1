import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { User } from '../../models/user';
import { Card } from '../../models/card';
import { Column } from '../../models/column';
import { ApiError } from '../../interfaces/api-error.interface';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
})
export class CardNewComponent implements OnInit {

  column: Column;
  users: User[];

  form: FormGroup;
  loading: boolean;
  errors: ApiError = {};

  constructor(public bsModalRef: BsModalRef,
              private formBuilder: FormBuilder,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      column: [this.column.id, Validators.required],
      content: ['', Validators.required],
      assignee: [''],
    });
  }

  submit(): void {
    this.loading = true;
    this.errors = {};
    this.apiService.createCard(this.form.value).subscribe(data => {
      this.column.cards.unshift(new Card(data));
      this.bsModalRef.hide();
    }, data => {
      this.loading = false;
      this.errors = data.error;
    });
  }
}
