import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Profile } from '../../../shared/models/profile.interface';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileDataService } from './profile-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly profileDataService = inject(ProfileDataService);

  private _me = signal<Profile | null>(null);

  me = computed(() => this._me()) ?? toSignal(this.getMe());

  getAccounts(
    filters: Partial<{
      firstName: string | null;
      lastName: string | null;
      stack: string | null;
    }>,
  ) {
    return this.profileDataService.getAccounts(filters);
  }

  getMe() {
    return this.profileDataService.getMe().pipe(tap((res) => this._me.set(res)));
  }

  getSubscribersShortList(subsAmount: number = 3) {
    return this.profileDataService.getSubscribersShortList(subsAmount);
  }

  getAccount(id: string) {
    return this.profileDataService.getAccount(id);
  }

  patchProfile(data: Partial<Profile>) {
    return this.profileDataService.patchProfile(data);
  }

  uploadAvatar(imageUrl: File) {
    return this.profileDataService.uploadAvatar(imageUrl);
  }
}
