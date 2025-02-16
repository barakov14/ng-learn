import { Routes } from '@angular/router';

export const chatsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature-chats/src/lib/chats/chats.component').then((c) => c.ChatsComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./feature-chat-workspace/src/lib/chat-workspace/chat-workspace.component').then(
            (c) => c.ChatWorkspaceComponent,
          ),
      },
    ],
  },
];
