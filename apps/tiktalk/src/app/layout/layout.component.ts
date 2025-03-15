import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiderbarComponent } from '@tt/common';
import { ChatsService } from '@tt/chats';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'tt-layout',
  imports: [RouterOutlet, SiderbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly #profileService = inject(ProfileService);
  readonly #chatsService = inject(ChatsService);
  protected readonly unreadMessagesCount = this.#chatsService.unreadMessagesCount;

  protected readonly profiles = toSignal(this.#profileService.getSubscribersShortList());
  protected readonly currentUser = toSignal(this.#profileService.getMe());
}
