import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from '@tt/common';

@Component({
  selector: 'tt-login-form-ui',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form-ui.component.html',
  styleUrl: './login-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly isLoading = input.required<boolean>();

  readonly login = output<LoginRequest>();

  protected isPasswordVisible = false;

  protected readonly loginForm = this.#fb.group({
    username: this.#fb.control<string>('AdilkhanBrkv', Validators.required),
    password: this.#fb.control<string>('SELrGxeaN8', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onLogin() {
    if (this.loginForm.invalid) return;

    this.login.emit(this.loginForm.getRawValue());
  }
}
