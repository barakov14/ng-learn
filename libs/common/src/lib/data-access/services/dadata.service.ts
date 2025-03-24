import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from './token';
import { DadataSuggestion } from '../models/dadata-suggestion';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DadataService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  getSuggestion(query: string) {
    return this.#http
      .post<{ suggestions: DadataSuggestion[] }>(
        this.#apiUrl,
        { query },
        {
          headers: {
            Authorization: `Token ${DADATA_TOKEN}`,
          },
        },
      )
      .pipe(map((res) => res.suggestions));
  }
}
