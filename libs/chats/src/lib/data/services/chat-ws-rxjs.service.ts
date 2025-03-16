import {
  ChatConnectionWsParams,
  ChatWsInterface,
  ChatWsMessage,
} from '../models/chat-ws.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { tap } from 'rxjs';

export class ChatWsRxjsService implements ChatWsInterface {
  #socket: WebSocketSubject<ChatWsMessage> | null = null;

  connect(params: ChatConnectionWsParams) {
    this.#socket?.unsubscribe();
    this.#socket = null;
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.#socket?.asObservable().pipe(tap((message) => params.handleMessage(message)));
  }

  disconnect(): void {
    this.#socket?.complete();
    this.#socket = null;
  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.next({
      text,
      chat_id: chatId,
    });
  }
}
