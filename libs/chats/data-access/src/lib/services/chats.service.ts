import { inject, Injectable } from '@angular/core';
import { ChatsDataService } from './chats-data.service';
import { map } from 'rxjs';
import { AuthService } from '@tt/auth/data-access';
import { Chat, GrouppedChat } from '../models/chats';
import { Message } from '@tt/chats/data-access';
import { Profile } from '@tt/common/data-access';
import { Messages } from '../models/message';
import { ChatWsNativeService } from './chat-ws-native.service';

@Injectable()
export class ChatsService {
  private readonly chatsDataService = inject(ChatsDataService);
  private readonly currentUser = inject(AuthService).currentUser;
  readonly #authService = inject(AuthService);
  readonly wsAdapter = new ChatWsNativeService();

  connectWs() {
    this.wsAdapter.connect({
      url: 'wss://icherniakov.ru/yt-course/chat/ws',
      token: this.#authService.token ?? '',
      handleMessage: this.handleWsMessage,
    });
  }

  // TODO: Замыкание
  handleWsMessage(message: unknown) {}

  getMyChats() {
    return this.chatsDataService.getMyChats();
  }

  getChatById(chatId: number) {
    return this.chatsDataService.getChatById(chatId).pipe(
      map((chat): Chat & { companion: Profile; messages: Messages } => ({
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

  getGroupedMessage(messages: Messages) {
    const grouped: GrouppedChat = [];
    const map = new Map<string, Array<Message & { user: Profile; isMine: boolean }>>();

    messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toLocaleDateString('ru-RU');

      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)?.push(message);
    });

    map.forEach((messages, dateKey) => {
      grouped.push({ date: new Date(dateKey.split('.').reverse().join('-')), messages });
    });

    return grouped;
  }
}
