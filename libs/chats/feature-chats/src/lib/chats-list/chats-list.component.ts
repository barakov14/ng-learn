import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatsBtnComponent } from './chats-btn/chats-btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatsService } from '@tt/chats/data-access';

@Component({
  selector: 'tt-chats-list',
  imports: [ChatsBtnComponent, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent {
  protected readonly chats = toSignal(
    inject(ChatsService)
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
      ),
  );

  filterChatsControl = new FormControl('');
}
