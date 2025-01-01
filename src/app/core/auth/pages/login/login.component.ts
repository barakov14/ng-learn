import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LoginRequest} from '../../models/auth';
import {firstValueFrom} from 'rxjs';
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

  onLogin(data: LoginRequest) {
    firstValueFrom(this.authService.login(data))
  }
}
