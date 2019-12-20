import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiError } from '@app/interfaces/api-error';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  loading = false;
  errors: ApiError = {};

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    this.loading = true;
    this.authService.signUp(
      this.form.get('email').value,
      this.form.get('username').value,
      this.form.get('password').value,
    ).subscribe(() => {
      }, (data: HttpErrorResponse): void => {
        this.loading = false;
        this.errors = data.error;
      },
    );
  }
}
