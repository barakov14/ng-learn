import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Chats, SendMessageResponse } from '@tt/chats/data-access';
import { GrouppedChat } from '../models/chats';

export const chatsActions = createActionGroup({
  source: 'Chats',
  events: {
    requestGetMyChats: emptyProps(),
    getMyChatsSuccess: props<{ chats: Chats[] }>(),
    getMyChatsFailure: props<{ error: string }>(),

    requestGetChatById: props<{ chatId: number }>(),
    getChatByIdSuccess: props<{ chat: GrouppedChat }>(),
    getChatByIdFailure: props<{ error: string }>(),

    requestSendMessage: props<{ chatId: number; message: string }>(),
    sendMessageSuccess: props<{ message: SendMessageResponse }>(),
    sendMessageFailure: props<{ error: string }>(),
  },
});
