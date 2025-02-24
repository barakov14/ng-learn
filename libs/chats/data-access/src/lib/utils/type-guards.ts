import { ChatWsMessage, ChatWsNewMessage, ChatWsUnreadMessage } from '../models/chat-ws.interface';

export function isUnreadMessage(message: ChatWsMessage): message is ChatWsUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(message: ChatWsMessage): message is ChatWsNewMessage {
  return 'action' in message && message.action === 'message';
}
