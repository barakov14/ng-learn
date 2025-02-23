import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatsService } from '@tt/chats/data-access';
import { ChatsDataService } from '@tt/chats/data-access';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  distinctUntilKeyChanged,
  interval,
  lastValueFrom,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '@tt/auth/data-access';
import { ChatWorkspaceMessagesWrapperComponent } from '../chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ChatWorkspaceHeaderComponent } from '../chat-workspace-messages-wrapper/chat-workspace-header/chat-workspace-header.component';
import { GrouppedChat } from '../../../../data-access/src/lib/models/chats';
import { Messages } from '../../../../data-access/src/lib/models/message';

@Component({
  selector: 'tt-chat-workspace',
  imports: [ChatWorkspaceMessagesWrapperComponent, ChatWorkspaceHeaderComponent],
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

  protected readonly messages = signal<Messages>([]);

  protected readonly activeChat = toSignal(
    this.route.params.pipe(
      distinctUntilKeyChanged('id'),
      switchMap(({ id }) =>
        interval(10000).pipe(
          startWith(0),
          switchMap(() => this.chatsService.getChatById(id)),
        ),
      ),
      tap((res) => {
        this.messages.set(res.messages);
      }),
    ),
  );

  onSendMessage(message: string) {
    this.chatsService.wsAdapter.sendMessage(message, this.chatId());
    // const resData = await lastValueFrom(this.chatsService.sendMessage(this.chatId(), message));
    /*this.messages.update((messages) => [
      ...messages,
      { ...resData, user: this.currentUser()!, isMine: true },
    ]);*/
  }
}
