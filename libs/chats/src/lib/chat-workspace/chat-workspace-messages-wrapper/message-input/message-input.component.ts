import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { AuthService, AvatarCircleComponent } from '@tt/common';

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
