import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
  Renderer2,
} from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'tt-message-input',
  imports: [AvatarCircleComponent, FastSvgComponent, ReactiveFormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  readonly sent = output<string>();
  protected readonly currentUser = inject(AuthService).currentUser;

  protected readonly messageText = new FormControl<string>('');

  onSendMessage() {
    if (!this.messageText.value) return;
    this.sent.emit(this.messageText.value);
    this.messageText.reset();
  }
}
