import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiError } from '@app/interfaces/api-error';
import { ApiPayload } from '@app/interfaces/api-payload';
import { Card } from '@app/interfaces/card';
import { Column } from '@app/interfaces/column';
import { User } from '@app/interfaces/user';
import { ApiService } from '@app/services/api.service';
import { BsModalRef } from 'ngx-bootstrap';

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
      title: ['', Validators.required],
      content: [''],
      assignee: [''],
    });
  }

  submit(): void {
    const payload: ApiPayload = this.form.value;
    payload.order = this.column.cards[0] ? (this.column.cards[0].order - 1) : 0;
    this.loading = true;
    this.errors = {};
    this.apiService.createCard(this.form.value).subscribe((data: Card): void => {
      this.column.cards.unshift(data);
      this.bsModalRef.hide();
    }, data => {
      this.loading = false;
      this.errors = data.error;
    });
  }
}
