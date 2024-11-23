import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient)

  private baseUrl = 'https://icherniakov.ru/yt-course';


  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}/account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}/account/me`);
  }
}
