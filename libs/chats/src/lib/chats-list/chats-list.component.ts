import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { ChatsBtnComponent } from './chats-btn/chats-btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { Chats } from '../data/models/chats';
import { ChatsService } from '../data/services/chats.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-chats-list',
  imports: [ChatsBtnComponent, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent implements OnInit {
  readonly #chatsService = inject(ChatsService);
  protected readonly chats = signal<Chats[]>([]);
  readonly #chatId = toSignal(inject(ActivatedRoute).params.pipe(map(({ id }) => Number(id))));

  ngOnInit() {
    this.#chatsService
      .getMyChats()
      .pipe(
        switchMap((chats) =>
          this.filterChatsControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            startWith(''),
            filter((inputValue) => typeof inputValue === 'string'),
            map((inputValue) =>
              chats.filter((chat) => {
                return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
                  .toLowerCase()
                  .includes(inputValue.toLowerCase());
              }),
            ),
          ),
        ),
      )
      .subscribe((chats) => {
        this.chats.set(chats);
      });
  }

  filterChatsControl = new FormControl('');

  constructor() {
    effect(() => {
      const unreadCounts = this.#chatsService.unreadMessagesCountByChatId();
      const activeChatId = this.#chatId();

      this.chats.update((chats) =>
        chats.map((chat) => ({
          ...chat,
          unreadMessages:
            chat.id === activeChatId
              ? 0
              : (unreadCounts.find((entry) => entry.chatId === chat.id)?.count ?? 0),
        })),
      );
    });
  }
}
