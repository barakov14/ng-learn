import { inject, Injectable } from '@angular/core';
import { ProfileDataService } from './profile-data.service';
import { Profile } from '@tt/common';
import { AuthService } from '@tt/auth';

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
  ) {
    return this.#profileDataService.getAccounts(filters);
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
