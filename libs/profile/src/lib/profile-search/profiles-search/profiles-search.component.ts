import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { selectProfileIsLoading, selectProfiles } from '../../data-access/store/profile.selectors';
import { profileActions } from '../../data-access/store/profile.actions';
import { InfiniteScrollTriggerComponent, LoaderComponent } from '@tt/common';

@Component({
  selector: 'tt-profiles-search',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    LoaderComponent,
    InfiniteScrollTriggerComponent,
  ],
  templateUrl: './profiles-search.component.html',
  styleUrl: './profiles-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilesSearchComponent {
  readonly #store = inject(Store);

  protected readonly profiles = this.#store.selectSignal(selectProfiles);
  protected readonly isLoading = this.#store.selectSignal(selectProfileIsLoading);

  onSearchProfiles(
    filters: Partial<{ firstName: string | null; lastName: string | null; stack: string | null }>,
  ) {
    this.#store.dispatch(profileActions.fetchGetAccounts({ filters }));
  }

  onLoadMoreProfiles() {
    this.#store.dispatch(profileActions.profileAccountsPageChange({}));
  }
}
