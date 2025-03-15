import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common';
import { Chats } from '../../data/models/chats';

@Component({
  selector: 'a[chats]',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtnComponent {
  readonly chat = input.required<Chats>();
}
