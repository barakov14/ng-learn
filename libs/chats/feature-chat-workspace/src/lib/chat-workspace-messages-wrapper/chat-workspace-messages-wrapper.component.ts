import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  runInInjectionContext,
  viewChild,
} from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MessageInputComponent } from './message-input/message-input.component';
import { delay, map, startWith, withLatestFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DateSeparatorPipe } from '@tt/common/utils';
import { ChatsService } from '@tt/chats/data-access';
import { ChatWithUser } from '../../../../data-access/src/lib/models/chats';

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
  readonly #injector = inject(Injector);
  readonly chatWithUser = input.required<ChatWithUser>();
  readonly sent = output<string>();
  protected readonly messagesWrapper =
    viewChild.required<ElementRef<HTMLDivElement>>('messagesWrapper');

  protected readonly groupedMessage = computed(() =>
    this.#chatsService.getGroupedMessage(this.chatWithUser()),
  );

  readonly #chatId = inject(ActivatedRoute).params.pipe(map((param) => param['id']));

  ngAfterViewInit() {
    runInInjectionContext(this.#injector, () => {
      this.#chatId
        .pipe(
          withLatestFrom(toObservable(this.chatWithUser).pipe(startWith(undefined))),
          delay(300),
          takeUntilDestroyed(this.#destroyRef),
        )
        .subscribe(() => {
          this.#scrollToBottom();
        });
    });
  }

  #scrollToBottom(behavior: ScrollBehavior = 'instant', height?: number) {
    const messagesWrapper = this.messagesWrapper().nativeElement;
    messagesWrapper.scrollTo({
      top: messagesWrapper.scrollHeight,
      behavior,
    });
  }

  onSendMessage(message: string) {
    this.sent.emit(message);
    this.#scrollToBottom('smooth');
  }
}
