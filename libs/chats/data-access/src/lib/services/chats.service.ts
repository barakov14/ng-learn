import { inject, Injectable, signal } from '@angular/core';
import { ChatsDataService } from './chats-data.service';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '@tt/auth/data-access';
import { ChatWithUser, GroupedChat } from '../models/chats';
import { Message } from '@tt/chats/data-access';
import { ChatWsMessage } from '../models/chat-ws.interface';
import { isNewMessage, isUnreadMessage } from '../utils/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';

@Injectable()
export class ChatsService {
  readonly #chatsDataService = inject(ChatsDataService);
  readonly #currentUser = inject(AuthService).currentUser;
  readonly #authService = inject(AuthService);
  readonly wsAdapter = new ChatWsRxjsService();

  readonly chat = signal<ChatWithUser | null>(null);

  readonly unreadMessagesCount = signal<number>(0);

  connectWs() {
    return this.wsAdapter.connect({
      url: 'https://icherniakov.ru/yt-course/chat/ws',
      token: this.#authService.token ?? '',
      handleMessage: this.handleWsMessage.bind(this),
    });
  }

  // TODO: Замыкание
  handleWsMessage(message: ChatWsMessage) {
    if (!('action' in message)) return;

    if (isUnreadMessage(message)) {
      this.unreadMessagesCount.set(message.data.count);
    }

    if (isNewMessage(message)) {
      const chat = this.chat();
      if (!chat) return;

      this.chat.set({
        ...chat,
        messages: [
          ...chat.messages,
          {
            id: message.data.id,
            userFromId: message.data.author,
            personalChatId: message.data.chat_id,
            text: message.data.message,
            createdAt: message.data.created_at,
            isRead: false,
            isMine: this.#currentUser()?.id === message.data.author,
            user: chat.userFirst.id === message.data.author ? chat.userFirst : chat.userSecond,
          },
        ],
      });
    }
  }

  getMyChats() {
    return this.#chatsDataService.getMyChats();
  }

  getChatById(chatId: number): Observable<ChatWithUser> {
    return this.#chatsDataService.getChatById(chatId).pipe(
      map(
        (chat): ChatWithUser => ({
          ...chat,
          companion:
            chat.userFirst.id === this.#currentUser()?.id ? chat.userSecond : chat.userFirst,
          messages: chat.messages.map((message) => ({
            ...message,
            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
            isMine:
              this.#currentUser()?.id ===
              (chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond).id,
          })),
        }),
      ),
      tap((messages) => this.chat.set(messages)),
    );
  }

  /*sendMessage(chatId: number, message: string) {
    return this.chatsDataService.sendMessage(chatId, message);
  }*/

  getGroupedMessage(chatWithUser: ChatWithUser) {
    const grouped: GroupedChat = {
      ...chatWithUser,
      messages: [],
    };

    const map = new Map<string, Message[]>();
    chatWithUser.messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toISOString().split('T')[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }

      map.get(dateKey)?.push(message);
    });

    map.forEach((messages, dateKey) => {
      grouped.messages.push({ date: dateKey, messages });
    });

    return grouped;
  }
}
