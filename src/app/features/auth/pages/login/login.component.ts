import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {LoginRequest} from '../../models/auth';
import {lastValueFrom} from 'rxjs';
import {LoginFormUiComponent} from '../../components/login-form-ui/login-form-ui.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'tt-login',
  imports: [
    LoginFormUiComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly authService = inject(AuthService)

  protected readonly isLoading = signal<boolean>(false)

  async onLogin(data: LoginRequest) {
    this.isLoading.set(true)

    await lastValueFrom(this.authService.login(data))

    this.isLoading.set(false)
  }
}
