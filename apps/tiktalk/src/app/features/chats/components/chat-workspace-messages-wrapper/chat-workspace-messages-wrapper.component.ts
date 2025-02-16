import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
import { Message } from '../../models/message';
import { Profile } from '../../../../shared/models/profile.interface';
import { DateSeparatorPipe } from '../../../../shared/pipes/date-separator.pipe';
import { GroupMessagePipe } from '../../utils/group-message.pipe';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MessageInputComponent } from './message-input/message-input.component';
import { delay, map, startWith, withLatestFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tt-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessageComponent,
    DateSeparatorPipe,
    GroupMessagePipe,
    MessageInputComponent,
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  readonly messages = input.required<Array<Message & { user: Profile; isMine: boolean }>>();
  readonly sent = output<string>();
  protected readonly messagesWrapper =
    viewChild.required<ElementRef<HTMLDivElement>>('messagesWrapper');

  private readonly chatId = inject(ActivatedRoute).params.pipe(map((param) => param['id']));

  ngAfterViewInit() {
    runInInjectionContext(this.injector, () => {
      this.chatId
        .pipe(
          withLatestFrom(toObservable(this.messages).pipe(startWith(undefined))),
          delay(300),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(() => {
          this.scrollToBottom();
        });
    });
  }

  private scrollToBottom(behavior: ScrollBehavior = 'instant', height?: number) {
    const messagesWrapper = this.messagesWrapper().nativeElement;
    messagesWrapper.scrollTo({
      top: messagesWrapper.scrollHeight,
      behavior,
    });
  }

  onSendMessage(message: string) {
    this.sent.emit(message);
    this.scrollToBottom('smooth');
  }
}
