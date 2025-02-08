import { inject, Injectable } from '@angular/core';
import { Profile } from '../../../shared/models/profile.interface';
import { map } from 'rxjs';
import { Pageble } from '../../../shared/models/pageble.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  private readonly http = inject(HttpClient);

  getAccounts(
    filters: Partial<{
      firstName: string | null;
      lastName: string | null;
      stack: string | null;
    }>,
  ) {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value !== null && value !== undefined) {
        params = params.set(key, value);
      }
    });

    return this.http.get<Pageble<Profile>>('/account/accounts', { params });
  }

  getMe() {
    return this.http.get<Profile>('/account/me');
  }

  getSubscribersShortList(subsAmount: number) {
    return this.http
      .get<Pageble<Profile>>('/account/subscribers/')
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`/account/${id}`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch('/account/me', profile);
  }

  uploadAvatar(imageUrl: File) {
    const data = new FormData();
    data.append('image', imageUrl);

    return this.http.post('/account/upload_image', data);
  }
}
