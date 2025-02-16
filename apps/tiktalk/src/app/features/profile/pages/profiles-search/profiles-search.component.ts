import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../../../shared/models/profile.interface';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { ProfileFiltersComponent } from '../../components/profile-filters/profile-filters.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'tt-profiles-search',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './profiles-search.component.html',
  styleUrl: './profiles-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilesSearchComponent implements OnInit {
  private readonly profileService = inject(ProfileService);

  protected readonly profiles = signal<Profile[]>([]);

  ngOnInit() {
    this.fetchProfiles({});
  }

  onSearchProfiles(
    filters: Partial<{
      firstName: string | null;
      lastName: string | null;
      stack: string | null;
    }>,
  ) {
    this.fetchProfiles(filters);
  }

  async fetchProfiles(
    filters: Partial<{
      firstName: string | null;
      lastName: string | null;
      stack: string | null;
    }>,
  ) {
    const resData = await lastValueFrom(this.profileService.getAccounts(filters));
    this.profiles.set(resData.items);
  }
}
