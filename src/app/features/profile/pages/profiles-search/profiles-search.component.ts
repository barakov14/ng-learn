import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, signal} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../../../shared/models/profile.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProfileCardComponent} from '../../../../shared/common-ui/profile-card/profile-card.component';

@Component({
  selector: 'tt-profiles-search',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './profiles-search.component.html',
  styleUrl: './profiles-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilesSearchComponent {
  private readonly profileService = inject(ProfileService)
  private readonly cdr = inject(ChangeDetectorRef)
  private readonly destroyRef = inject(DestroyRef)

  profiles = signal<Profile[]>([])


  ngOnInit() {
    this.profileService.getTestAccounts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        this.profiles.set(val)
        // this.cdr.markForCheck()
      })
  }
}
