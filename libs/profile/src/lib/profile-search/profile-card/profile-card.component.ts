import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarCircleComponent, Profile } from '@tt/common';

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
