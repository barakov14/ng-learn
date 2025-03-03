import { Profile } from '@tt/common/data-access';

export type Message = {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
};
export type SendMessageResponse = {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
};

export type Messages = Array<Message & { user: Profile; isMine: boolean }>;
