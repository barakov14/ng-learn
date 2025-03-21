import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '@tt/common';

@Injectable({ providedIn: 'root' })
export class NameValidator implements AsyncValidator {
  readonly #http = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.#http.get<Profile[]>('/account/test_accounts').pipe(
      map((users) => {
        return users.filter((u) => u.firstName === control.value).length > 0
          ? null
          : { nameValid: { message: 'Пользователь с этим ником уже существует!' } };
      }),
    );
  }
}
