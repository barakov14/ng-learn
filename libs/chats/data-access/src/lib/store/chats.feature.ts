import { createFeature, createReducer, on } from '@ngrx/store';
import { chatsActions } from './chats.actions';
import { Chats, GrouppedChat } from '../models/chats';

export type ChatsState = {
  chats: Chats[];
  chatsGrouppedChat: Record<number, GrouppedChat>;
  currentChatId: number;
  isLoading: boolean;
  error: string | null;
};

export const chatsInitialState: ChatsState = {
  chats: [],
  chatsGrouppedChat: {},
  currentChatId: 0,
  isLoading: false,
  error: null,
};

export const chatsFeature = createFeature({
  name: 'chats',
  reducer: createReducer(
    chatsInitialState,
    on(chatsActions.requestGetMyChats, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(chatsActions.getMyChatsSuccess, (state, { chats }) => ({
      ...state,
      chats,
      isLoading: true,
      error: null,
    })),
    on(chatsActions.getMyChatsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(chatsActions.requestGetChatById, (state, { chatId }) => ({
      ...state,
      isLoading: true,
      currentChatId: chatId,
      error: null,
    })),
    on(chatsActions.getChatByIdSuccess, (state, { chat }) => ({
      ...state,
      isLoading: false,
      error: null,
      chatsGrouppedChat: {
        ...state.chatsGrouppedChat,
        [state.currentChatId]: chat,
      },
    })),
    on(chatsActions.getChatByIdFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(chatsActions.requestSendMessage, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(chatsActions.sendMessageSuccess, (state) => ({
      ...state,
      isLoading: false,
      error: null,
    })),
    on(chatsActions.sendMessageFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
