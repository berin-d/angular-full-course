import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {

  // FormBuilder instance injected
  private formBuilder = inject(FormBuilder);
  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  invalidCredentials = signal(false);


  // Methods

  login() {
    throw new Error('Method not implemented.');
  }
  isFieldValid(arg0: string): boolean {
    const control = this.loginFormGroup.get(arg0);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
