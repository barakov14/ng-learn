import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Message } from '@tt/chats/data-access';
import { AvatarCircleComponent } from '@tt/common/ui';
import { Profile } from '@tt/common/data-access';

@Component({
  selector: 'tt-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe, RouterLink],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessageComponent {
  readonly message = input.required<Message & { user: Profile; isMine: boolean }>();
}
