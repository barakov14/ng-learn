import { inject, Injectable, signal } from '@angular/core';
import { ChatsDataService } from './chats-data.service';
import { map, Observable, tap } from 'rxjs';
import { ChatWithUser, GroupedChat } from '../models/chats';
import { ChatWsMessage } from '../models/chat-ws.interface';
import { isNewMessage, isUnreadMessage } from '../utils/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { AuthService } from '@tt/auth';
import { Message } from '../models/message';

@Injectable({ providedIn: 'root' })
export class ChatsService {
  readonly #chatsDataService = inject(ChatsDataService);
  readonly #authService = inject(AuthService);
  readonly wsAdapter = new ChatWsRxjsService();

  readonly #currentUser = this.#authService.currentUser;

  readonly chat = signal<ChatWithUser | null>(null);
  readonly unreadMessagesCountByChatId = signal<Array<{ chatId: number; count: number }>>([]);

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
      if (message.data.author !== this.#currentUser()?.id) {
        const updatedCounts = this.unreadMessagesCountByChatId().map((entry) =>
          entry.chatId === message.data.chat_id
            ? { chatId: entry.chatId, count: entry.count + 1 }
            : entry,
        );

        if (!updatedCounts.some((entry) => entry.chatId === message.data.chat_id)) {
          updatedCounts.push({ chatId: message.data.chat_id, count: 1 });
        }
        this.unreadMessagesCountByChatId.set(updatedCounts);
        // this.unreadMessagesCount.update((count) => count + 1);
      }

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

  sendMessage(message: string, chatId: number) {
    this.wsAdapter.sendMessage(message, chatId);
  }

  getMyChats() {
    return this.#chatsDataService.getMyChats();
  }

  getChatById(chatId: number): Observable<ChatWithUser> {
    return this.#chatsDataService.getChatById(chatId).pipe(
      tap(() => {
        const messagesCountByChatId = this.unreadMessagesCountByChatId().find(
          (value) => value.chatId === chatId,
        );

        if (messagesCountByChatId) {
          this.unreadMessagesCount.update((count) => count - messagesCountByChatId.count);

          this.unreadMessagesCountByChatId.update((countByChat) =>
            countByChat.filter((entry) => entry.chatId !== chatId),
          );
        }
      }),
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
