import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pageble, Profile } from '@tt/common';

@Injectable()
export class ProfileDataService {
  readonly #http = inject(HttpClient);

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
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value !== null && value !== undefined) {
        params = params.set(key, value);
      }
    });

    params = params.set('page', pageable.page);
    params = params.set('size', pageable.size);

    return this.#http.get<Pageble<Profile>>('/account/accounts', { params });
  }

  getSubscribersShortList(subsAmount: number) {
    return this.#http
      .get<Pageble<Profile>>('/account/subscribers/')
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getAccount(id: number) {
    return this.#http.get<Profile>(`/account/${id}`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.#http.patch('/account/me', profile);
  }

  uploadAvatar(imageUrl: File) {
    const data = new FormData();
    data.append('image', imageUrl);

    return this.#http.post<Profile>('/account/upload_image', data);
  }

  createChat(userId: number) {
    return this.#http.post(`/chat/${userId}`, {});
  }
}
