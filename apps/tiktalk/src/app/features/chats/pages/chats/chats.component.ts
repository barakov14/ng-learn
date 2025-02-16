import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../../components/chats-list/chats-list.component';
import { ChatsDataService } from '../../services/chats-data.service';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'tt-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatsDataService, ChatsService],
})
export class ChatsComponent {}
