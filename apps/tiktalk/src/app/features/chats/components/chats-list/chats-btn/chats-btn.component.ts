import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { Chats } from '../../../models/chats';

@Component({
  selector: 'a[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtnComponent {
  readonly chat = input.required<Chats>();
}
