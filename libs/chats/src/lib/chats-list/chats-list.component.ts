import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatsBtnComponent } from './chats-btn/chats-btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrentUserChats } from '../data/models/chats';
import { ChatsService } from '../data/services/chats.service';

@Component({
  selector: 'tt-chats-list',
  imports: [ChatsBtnComponent, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent {
  readonly #chatsService = inject(ChatsService);
  protected readonly chats = toSignal(
    this.#chatsService.getMyChats().pipe(
      map((chats: CurrentUserChats) => {
        const unreadMessages = this.#chatsService.unreadMessagesCountByChatId();

        return chats.map((chat) => ({
          ...chat,
          unreadMessagesCount: unreadMessages.find((value) => value.chatId === chat.id)?.count ?? 0,
        }));
      }),
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
    ),
  );

  filterChatsControl = new FormControl('');
}
