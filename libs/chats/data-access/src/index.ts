import { Chat, Chats, UserFirst, UserFrom, UserSecond } from './lib/models/chats';
import { Message, SendMessageResponse } from './lib/models/message';
import { ChatsDataService } from './lib/services/chats-data.service';
import { ChatsService } from './lib/services/chats.service';

export type { UserFrom, Chats, UserFirst, UserSecond, Chat, Message, SendMessageResponse };
export { ChatsService, ChatsDataService };
