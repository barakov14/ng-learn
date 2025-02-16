import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { Chats } from '@tt/chats/data-access';
import { AvatarCircleComponent } from '@tt/common/ui';

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
