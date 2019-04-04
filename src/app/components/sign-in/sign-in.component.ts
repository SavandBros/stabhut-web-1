import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  loading = false;
  errors = {};

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    this.loading = true;
    this.errors = {};

    this.authService.signIn(this.f.username.value, this.f.password.value).subscribe(null, (data: any) => {
      this.loading = false;
      this.errors = data.error;
    });
  }
}
