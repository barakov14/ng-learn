export interface ChatWsInterface {
  connect: (params: ChatConnectionWsParams) => void;
  sendMessage: (message: string, chatId: number) => void;
  disconnect: () => void;
}

export interface ChatConnectionWsParams {
  url: string;
  token: string;
  handleMessage: (message: unknown) => void;
}
