import { Routes } from '@angular/router';

export const chatsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chats/chats.component').then((c) => c.ChatsComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./chat-workspace/chat-workspace.component').then((c) => c.ChatWorkspaceComponent),
      },
    ],
  },
];
