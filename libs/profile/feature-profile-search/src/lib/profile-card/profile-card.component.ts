import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common/ui';
import { RouterLink } from '@angular/router';
import { Profile } from '@tt/profile/data-access';

@Component({
  selector: 'tt-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  imports: [AvatarCircleComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly profile = input.required<Profile>();
}
