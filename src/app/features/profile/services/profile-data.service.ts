import {inject, Injectable} from '@angular/core';
import {Profile} from '../../../shared/models/profile.interface';
import {map} from 'rxjs';
import {Pageble} from '../../../shared/models/pageble.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  private baseUrl = 'https://icherniakov.ru/yt-course';

  private readonly http = inject(HttpClient)


  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}/account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}/account/me`)
  }

  getSubscribersShortList(subsAmount: number) {
    return this.http.get<Pageble<Profile>>(`${this.baseUrl}/account/subscribers/`)
      .pipe(
        map((res) => res.items.slice(0, subsAmount))
      );
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}/account/${id}`);
  }


  patchProfile(profile: Partial<Profile>) {
    return this.http.patch(`${this.baseUrl}/account/me`, profile)
  }
}
