import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ChatsBtnComponent } from './chats-btn/chats-btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatsService } from '../../services/chats.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'tt-chats-list',
  imports: [ChatsBtnComponent, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent implements OnInit {
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

  ngOnInit() {}
}
