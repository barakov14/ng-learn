import { ChatConnectionWsParams, ChatWsInterface } from '../models/chat-ws.interface';

export class ChatWsNativeService implements ChatWsInterface {
  private socket: WebSocket | null = null;

  connect(params: ChatConnectionWsParams): void {
    if (this.socket) return;
    this.socket = new WebSocket(params.url, [params.token]);

    this.socket.onmessage = (event) => {
      params.handleMessage(JSON.parse(event.data));
    };

    this.socket.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  sendMessage(message: string, chatId: number): void {
    this.socket?.send(
      JSON.stringify({
        text: message,
        chat_id: chatId,
      }),
    );
  }

  disconnect(): void {
    this.socket?.close();
  }
}
