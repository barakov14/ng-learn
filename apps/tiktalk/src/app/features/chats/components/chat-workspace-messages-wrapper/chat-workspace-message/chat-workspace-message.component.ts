import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { Message } from '../../../models/message';
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { Profile } from '../../../../../shared/models/profile.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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
