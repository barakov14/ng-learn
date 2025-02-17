import { Message, Messages } from './message';
import { Profile } from '@tt/common/data-access';

export type UserFrom = {
  id: number;
  username: string;
  avatarUrl: string;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
};

export type Chats = {
  id: number;
  userFrom: UserFrom;
  message?: any;
  createdAt?: any;
  unreadMessages: number;
};

export type UserFirst = Profile;

export type UserSecond = Profile;

export type Chat = {
  id: number;
  userFirst: UserFirst;
  userSecond: UserSecond;
  messages: Message[];
};

export type GrouppedChat = {
  date: Date;
  messages: Messages;
}[];
