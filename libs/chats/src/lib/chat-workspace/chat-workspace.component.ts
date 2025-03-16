import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-messages-wrapper/chat-workspace-header/chat-workspace-header.component';
import { ChatsService } from '../data/services/chats.service';

@Component({
  selector: 'tt-chat-workspace',
  imports: [ChatWorkspaceMessagesWrapperComponent, ChatWorkspaceHeaderComponent],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #chatsService = inject(ChatsService);
  readonly #destroyRef = inject(DestroyRef);

  readonly #chatId = this.#route.params.pipe(map((params) => Number(params['id'])));
  private readonly chatId = toSignal(this.#chatId);

  ngOnInit() {
    this.#chatId
      .pipe(
        tap((chatId) => {
          this.#chatsService.unreadMessagesCountByChatId.update((unreadCount) =>
            unreadCount.filter((value) => value.chatId !== chatId),
          );
        }),
        switchMap((chatId) => this.#chatsService.getChatById(chatId)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((chat) => {});
  }

  protected readonly activeChat = this.#chatsService.chat;

  onSendMessage(message: string) {
    const chatId = this.chatId();
    if (!chatId) return;
    this.#chatsService.sendMessage(message, chatId);
  }
}
