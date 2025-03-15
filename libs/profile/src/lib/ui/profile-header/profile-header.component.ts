import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent, Profile } from '@tt/common';

@Component({
  selector: 'tt-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  readonly profile = input.required<Profile>();
}
