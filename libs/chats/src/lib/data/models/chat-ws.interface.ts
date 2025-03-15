export interface ChatWsInterface {
  connect: (params: ChatConnectionWsParams) => void;
  sendMessage: (message: string, chatId: number) => void;
  disconnect: () => void;
}

export interface ChatConnectionWsParams {
  url: string;
  token: string;
  handleMessage: (message: ChatWsMessage) => void;
}

export interface ChatWsMessageBase {
  status: 'success' | 'error';
}

export interface ChatWsUnreadMessage extends ChatWsMessageBase {
  action: 'unread';
  data: {
    count: number;
  };
}

export interface ChatWsNewMessage extends ChatWsMessageBase {
  action: 'message';
  data: {
    id: number;
    message: string;
    chat_id: number;
    created_at: string;
    author: number;
  };
}

export interface ChatWsError extends ChatWsMessageBase {
  message: string;
}

export type ChatWsSendMessage = {
  text: string;
  chat_id: number;
};

export type ChatWsMessage =
  | ChatWsUnreadMessage
  | ChatWsSendMessage
  | ChatWsNewMessage
  | ChatWsError;
