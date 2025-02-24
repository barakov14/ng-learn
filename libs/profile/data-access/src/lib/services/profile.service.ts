import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileDataService } from './profile-data.service';
import { Profile } from '@tt/common/data-access';

@Injectable()
export class ProfileService {
  readonly #profileDataService = inject(ProfileDataService);

  #me = signal<Profile | null>(null);

  me = computed(() => this.#me()) ?? toSignal(this.getMe());

  getAccounts(
    filters: Partial<{
      firstName: string | null;
      lastName: string | null;
      stack: string | null;
    }>,
  ) {
    return this.#profileDataService.getAccounts(filters);
  }

  getMe() {
    return this.#profileDataService.getMe().pipe(tap((res) => this.#me.set(res)));
  }

  getSubscribersShortList(subsAmount: number = 3) {
    return this.#profileDataService.getSubscribersShortList(subsAmount);
  }

  getAccount(id: number) {
    return this.#profileDataService.getAccount(id);
  }

  patchProfile(data: Partial<Profile>) {
    return this.#profileDataService.patchProfile(data);
  }

  uploadAvatar(imageUrl: File) {
    return this.#profileDataService.uploadAvatar(imageUrl);
  }

  createChat(userId: number) {
    return this.#profileDataService.createChat(userId);
  }
}
