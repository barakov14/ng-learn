import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from '../../models/auth';

@Component({
  selector: 'tt-login-form-ui',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form-ui.component.html',
  styleUrl: './login-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  readonly isLoading = input.required<boolean>();

  login = output<LoginRequest>();

  isPasswordVisible = false;

  loginForm = this.fb.group({
    username: this.fb.control<string>('AdilkhanBrkv', Validators.required),
    password: this.fb.control<string>('SELrGxeaN8', [Validators.required, Validators.minLength(6)]),
  });

  onLogin() {
    if (this.loginForm.invalid) return;

    this.login.emit(this.loginForm.getRawValue());
  }
}
