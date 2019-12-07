import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
})
export class FormAddComponent implements OnInit {

  @Input() name: string;
  @Input() margin = true;
  @Input() button = true;

  @Output() save = new EventEmitter<string>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.save.emit(this.form.controls.name.value);
    this.form.patchValue({
      name: '',
    });
  }
}
