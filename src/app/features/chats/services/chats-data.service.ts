import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, Chats } from '../models/chats';
import { SendMessageResponse } from '../models/message';

@Injectable()
export class ChatsDataService {
  private readonly http = inject(HttpClient);

  createChat(userId: number) {
    return this.http.post<Chat>(`/chat/${userId}`, {});
  }

  getMyChats() {
    return this.http.get<Chats[]>(`/chat/get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`/chat/${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<SendMessageResponse>(
      `/message/send/${chatId}`,
      {},
      {
        params: { message },
      },
    );
  }
}
