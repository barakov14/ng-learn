import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map, switchMap } from 'rxjs';
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
  // private readonly currentUser = inject(AuthService).currentUser;

  readonly #chatId = this.#route.params.pipe(map((params) => Number(params['id'])));
  private readonly chatId = toSignal(this.#chatId);

  protected readonly activeChat = computed(() => {
    return this.#chatsService.chat();
  });

  ngOnInit() {
    firstValueFrom(
      this.#chatId.pipe(switchMap((chatId) => this.#chatsService.getChatById(chatId))),
    );
  }

  onSendMessage(message: string) {
    this.#chatsService.wsAdapter.sendMessage(message, Number(this.chatId()));
  }
}
