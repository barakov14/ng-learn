import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, signal} from '@angular/core';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interfaces/profile.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
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
