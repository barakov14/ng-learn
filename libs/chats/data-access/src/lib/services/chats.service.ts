import { inject, Injectable } from '@angular/core';
import { ChatsDataService } from './chats-data.service';
import { map } from 'rxjs';
import { AuthService } from '@tt/auth/data-access';

@Injectable()
export class ChatsService {
  private readonly chatsDataService = inject(ChatsDataService);
  private readonly currentUser = inject(AuthService).currentUser;

  createChat(userId: number) {
    return this.chatsDataService.createChat(userId);
  }

  getMyChats() {
    return this.chatsDataService.getMyChats();
  }

  getChatById(chatId: number) {
    return this.chatsDataService.getChatById(chatId).pipe(
      map((chat) => ({
        ...chat,
        companion: chat.userFirst.id === this.currentUser()?.id ? chat.userSecond : chat.userFirst,
        messages: chat.messages.map((message) => ({
          ...message,
          user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
          isMine:
            this.currentUser()?.id ===
            (chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond).id,
        })),
      })),
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.chatsDataService.sendMessage(chatId, message);
  }
}
