import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '../../../../shared/models/profile.interface';
import { AvatarCircleComponent } from '../../../../shared/components/avatar-circle/avatar-circle.component';
import { RouterLink } from '@angular/router';

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
