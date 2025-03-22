import { inject, Injectable } from '@angular/core';
import { ProfileDataService } from '../../../index';
import { AuthService, Profile } from '@tt/common';

@Injectable()
export class ProfileService {
  readonly #profileDataService = inject(ProfileDataService);
  readonly #authService = inject(AuthService);

  me = this.#authService.currentUser;

  getAccounts(
    filters: Partial<{
      firstName: string | null;
      lastName: string | null;
      stack: string | null;
    }>,
    pageable: {
      page: number;
      size: number;
    },
  ) {
    return this.#profileDataService.getAccounts(filters, pageable);
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
