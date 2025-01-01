import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map, switchMap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProfileHeaderComponent} from '../../../../shared/common-ui/profile-header/profile-header.component';
import {SvgIconComponent} from 'angular-svg-icon';
import {ImageUrlPipe} from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'tt-profile',
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    RouterLink,
    ImageUrlPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService)
  private readonly route = inject(ActivatedRoute)

  subscribers$ = toSignal(this.profileService.getSubscribersShortList(5))


  profile = toSignal(
    this.route.params.pipe(
      map((param): string => param['id']),
      switchMap((id) => id === 'me'
        ? this.profileService.getMe()
        : this.profileService.getAccount(id))
    )
  )
}
