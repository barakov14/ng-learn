import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiderbarComponent } from '@tt/common/ui';
import { ProfileService } from '@tt/profile/data-access';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-layout',
  imports: [RouterOutlet, SiderbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly profileService = inject(ProfileService);

  protected readonly profiles = toSignal(this.profileService.getSubscribersShortList());
  protected readonly currentUser = toSignal(this.profileService.getMe());
}
