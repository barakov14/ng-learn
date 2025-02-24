import { Message } from './message';
import { Profile } from '@tt/common/data-access';

export type Chat = {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
};

export type ChatWithUser = {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
  companion: Profile;
};

export type GroupedChat = {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  companion: Profile;
  messages: Array<{ date: string; messages: Message[] }>;
};

export type Chats = {
  id: number;
  userFrom: Profile;
  message: string;
  createdAt: string;
  unreadMessages: number;
};
export type CurrentUserChats = Chats[];
