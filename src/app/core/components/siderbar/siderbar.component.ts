import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SvgIconComponent} from 'angular-svg-icon';
import {ProfileService} from '../../../features/profile/services/profile.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ImageUrlPipe} from '../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'tt-siderbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    SvgIconComponent,
    SvgIconComponent,
    ImageUrlPipe
  ],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiderbarComponent {
  private readonly profileService = inject(ProfileService)

  subscribers$ = toSignal(this.profileService.getSubscribersShortList())
  me$ = toSignal(this.profileService.getMe())
}
