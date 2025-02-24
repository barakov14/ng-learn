import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiderbarComponent } from '@tt/common/ui';
import { ProfileService } from '@tt/profile/data-access';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ChatsService } from '@tt/chats/data-access';

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
