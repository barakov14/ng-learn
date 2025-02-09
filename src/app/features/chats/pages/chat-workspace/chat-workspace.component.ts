import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatWorkspaceMessagesWrapperComponent } from '../../components/chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ChatWorkspaceHeaderComponent } from '../../components/chat-workspace-messages-wrapper/chat-workspace-header/chat-workspace-header.component';
import { MessageInputComponent } from '../../components/message-input/message-input.component';
import { ChatsService } from '../../services/chats.service';
import { ChatsDataService } from '../../services/chats-data.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { lastValueFrom, map, switchMap, tap } from 'rxjs';
import { Message } from '../../models/message';
import { Profile } from '../../../../shared/models/profile.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'tt-chat-workspace',
  imports: [
    ChatWorkspaceMessagesWrapperComponent,
    ChatWorkspaceHeaderComponent,
    MessageInputComponent,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatsDataService, ChatsService],
})
export class ChatWorkspaceComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly chatsService = inject(ChatsService);
  private readonly currentUser = inject(AuthService).currentUser;

  private readonly chatId = toSignal(this.route.params.pipe(map((params) => params['id'])));

  protected readonly messages = signal<Array<Message & { user: Profile; isMine: boolean }>>([]);

  protected readonly activeChat = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.chatsService.getChatById(id)),
      tap(({ messages }) => this.messages.set(messages)),
    ),
  );

  async onSendMessage(message: string) {
    const resData = await lastValueFrom(this.chatsService.sendMessage(this.chatId(), message));
    this.messages.update((messages) => [
      ...messages,
      { ...resData, user: this.currentUser()!, isMine: true },
    ]);
  }
}
