import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { Message } from '../../models/message';
import { Profile } from '../../../../shared/models/profile.interface';

@Component({
  selector: 'tt-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessagesWrapperComponent {
  readonly messages = input.required<Array<Message & { user: Profile; isMine: boolean }>>();
}
