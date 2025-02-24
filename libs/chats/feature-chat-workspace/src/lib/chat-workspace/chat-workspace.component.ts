import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { ChatsService } from '@tt/chats/data-access';
import { ChatsDataService } from '@tt/chats/data-access';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { lastValueFrom, map } from 'rxjs';
import { ChatWorkspaceMessagesWrapperComponent } from '../chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ChatWorkspaceHeaderComponent } from '../chat-workspace-messages-wrapper/chat-workspace-header/chat-workspace-header.component';

@Component({
  selector: 'tt-chat-workspace',
  imports: [ChatWorkspaceMessagesWrapperComponent, ChatWorkspaceHeaderComponent],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #chatsService = inject(ChatsService);
  // private readonly currentUser = inject(AuthService).currentUser;

  readonly #chatId = toSignal(this.#route.params.pipe(map((params): string => params['id'])));

  protected readonly activeChat = computed(() => {
    return this.#chatsService.chat();
  });

  constructor() {
    effect(() => {
      const chatId = this.#chatId();
      lastValueFrom(this.#chatsService.getChatById(Number(chatId)));
    });
  }

  onSendMessage(message: string) {
    this.#chatsService.wsAdapter.sendMessage(message, Number(this.#chatId()));
  }
}
