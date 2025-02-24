import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProfileFilters } from '@tt/profile/data-access';

@Component({
  selector: 'tt-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #destroyRef = inject(DestroyRef);
  protected readonly searchForm = inject(NonNullableFormBuilder).group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    stack: new FormControl(''),
  });
  readonly search =
    output<Partial<{ firstName: string | null; lastName: string | null; stack: string | null }>>();

  ngOnInit() {
    this.searchForm.patchValue({
      ...this.#store.selectSignal(selectProfileFilters)(),
    });

    this.searchForm.valueChanges
      .pipe(
        startWith(this.#store.selectSignal(selectProfileFilters)()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((searchTerms) => {
        this.search.emit(searchTerms);
      });
  }
}
