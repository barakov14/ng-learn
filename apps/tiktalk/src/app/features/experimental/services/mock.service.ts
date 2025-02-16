import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor() {}

  getAdditionals() {
    return of<Checkbox[]>(checkbox);
  }
}

export interface Checkbox {
  title: string;
  control: string;
  value: boolean;
}

export const checkbox = [
  {
    title: 'Wi-Fi модуль',
    control: 'wifi',
    value: false,
  },
  {
    title: 'Smart TV',
    control: 'smartTv',
    value: true,
  },
  {
    title: 'Подключение к антенне',
    control: 'antenna',
    value: false,
  },
];
