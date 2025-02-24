import { ChatConnectionWsParams, ChatWsInterface } from '../models/chat-ws.interface';

export class ChatWsNativeService implements ChatWsInterface {
  #socket: WebSocket | null = null;

  connect(params: ChatConnectionWsParams) {
    if (this.#socket) return;

    this.#socket = new WebSocket(params.url, [params.token]);

    this.#socket.onmessage = (event) => {
      params.handleMessage(JSON.parse(event.data));
    };
  }

  sendMessage(message: string, chatId: number): void {
    if (!this.#socket) {
      return;
    }
    this.#socket.send(
      JSON.stringify({
        text: message,
        chat_id: chatId,
      }),
    );
  }

  disconnect(): void {
    this.#socket?.close();
  }
}
