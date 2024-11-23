import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

@Component({
  selector: 'tt-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private readonly fb = inject(NonNullableFormBuilder)
  private readonly authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)

  loginForm = this.fb.group({
    username: ['AdilkhanBrkv', Validators.required],
    password: ['SELrGxeaN8', [Validators.required, Validators.minLength(6)]],
  })

  onLogin(){
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigate(['/'])
        })
    }
  }
}
