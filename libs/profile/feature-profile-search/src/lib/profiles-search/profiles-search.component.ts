import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { profileActions, selectProfiles } from '@tt/profile/data-access';
import { ProfileCardComponent } from '@tt/profile/feature-profile-search';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-profiles-search',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './profiles-search.component.html',
  styleUrl: './profiles-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilesSearchComponent {
  private readonly store = inject(Store);

  protected readonly profiles = this.store.selectSignal(selectProfiles);

  onSearchProfiles(
    filters: Partial<{ firstName: string | null; lastName: string | null; stack: string | null }>,
  ) {
    this.store.dispatch(profileActions.fetchGetAccounts({ filters }));
  }
}
