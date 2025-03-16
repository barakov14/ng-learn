import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessageInputComponent } from './message-input/message-input.component';
import { delay, map, shareReplay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../../data/services/chats.service';
import { ChatWithUser } from '../../data/models/chats';
import { DateSeparatorPipe } from '@tt/common';

@Component({
  selector: 'tt-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, DateSeparatorPipe, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessagesWrapperComponent {
  readonly #chatsService = inject(ChatsService);
  readonly chatWithUser = input.required<ChatWithUser>();
  readonly sent = output<string>();
  protected readonly messagesWrapper =
    viewChild.required<ElementRef<HTMLDivElement>>('messagesWrapper');

  protected readonly groupedMessage = computed(() => {
    const chatWithUser = this.chatWithUser();
    return this.#chatsService.getGroupedMessage(chatWithUser);
  });

  protected readonly isScrolledToBottom = signal<boolean>(true);

  constructor() {
    effect(() => {
      if (this.groupedMessage()) {
        this.isScrolledToBottom.set(false);
      }
    });
  }

  readonly #chatId = inject(ActivatedRoute).params.pipe(
    map((param) => Number(param['id'])),
    delay(100),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  private readonly chatId = toSignal(this.#chatId);

  readonly newMessagesCount = computed(() => {
    return (
      this.#chatsService
        .unreadMessagesCountByChatId()
        .find((value) => value.chatId === this.chatId())?.count ?? 0
    );
  });

  scrollToBottom() {
    const messagesWrapper = this.messagesWrapper().nativeElement;
    messagesWrapper.scrollTo({
      top: messagesWrapper.scrollHeight,
      behavior: 'smooth',
    });
    this.isScrolledToBottom.set(true);
  }

  onSendMessage(message: string) {
    this.sent.emit(message);
  }
}
