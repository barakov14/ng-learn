import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MessageInputComponent } from './message-input/message-input.component';
import { debounceTime, delay, filter, fromEvent, map, shareReplay, withLatestFrom } from 'rxjs';
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
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #chatsService = inject(ChatsService);
  readonly chatWithUser = input.required<ChatWithUser>();
  readonly sent = output<string>();
  protected readonly messagesWrapper =
    viewChild.required<ElementRef<HTMLDivElement>>('messagesWrapper');

  protected readonly isScrolledToBottom = signal<boolean>(false);

  protected readonly groupedMessage = computed(() =>
    this.#chatsService.getGroupedMessage(this.chatWithUser()),
  );

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

  ngAfterViewInit() {
    const messageWrapper = this.messagesWrapper().nativeElement;

    let scrollPositions: Record<number, number> = JSON.parse(
      localStorage.getItem('lastScrollPositions') || '{}',
    );

    this.#chatId.pipe(delay(100), takeUntilDestroyed(this.#destroyRef)).subscribe((chatId) => {
      this.scrollTo('instant', scrollPositions[chatId]);
    });

    fromEvent(messageWrapper, 'scroll')
      .pipe(
        debounceTime(100),
        withLatestFrom(this.#chatId),
        filter(
          ([_, chatId]) =>
            Math.round(messageWrapper.scrollTop) !== Math.round(scrollPositions[chatId] || 0),
        ),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(([_, chatId]) => {
        scrollPositions[chatId] = messageWrapper.scrollTop;
        localStorage.setItem('lastScrollPositions', JSON.stringify(scrollPositions));

        this.isScrolledToBottom.set(
          Math.round(messageWrapper.scrollTop + messageWrapper.clientHeight) ===
            Math.round(messageWrapper.scrollHeight),
        );
      });
  }

  scrollTo(behavior: ScrollBehavior = 'instant', height?: number) {
    const messagesWrapper = this.messagesWrapper().nativeElement;
    messagesWrapper.scrollTo({
      top: height !== undefined ? height : 0,
      behavior,
    });
  }

  onSendMessage(message: string) {
    this.sent.emit(message);
  }
}
