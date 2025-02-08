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
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'tt-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly searchForm = inject(NonNullableFormBuilder).group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    stack: new FormControl(''),
  });
  readonly search =
    output<Partial<{ firstName: string | null; lastName: string | null; stack: string | null }>>();

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((searchTerms) => {
        this.search.emit(searchTerms);
      });
  }
}
