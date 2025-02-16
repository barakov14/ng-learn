import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsDataService } from '@tt/chats/data-access';
import { ChatsService } from '@tt/chats/data-access';
import { ChatsListComponent } from '../chats-list/chats-list.component';

@Component({
  selector: 'tt-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatsDataService, ChatsService],
})
export class ChatsComponent {}
