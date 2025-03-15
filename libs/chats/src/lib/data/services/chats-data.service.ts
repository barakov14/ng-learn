import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, CurrentUserChats } from '../models/chats';
import { SendMessageResponse } from '../models/message';

@Injectable({ providedIn: 'root' })
export class ChatsDataService {
  readonly #http = inject(HttpClient);

  getMyChats() {
    return this.#http.get<CurrentUserChats>(`/chat/get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`/chat/${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<SendMessageResponse>(
      `/message/send/${chatId}`,
      {},
      {
        params: { message },
      },
    );
  }
}
