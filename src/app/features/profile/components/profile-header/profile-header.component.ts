import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '../../../../shared/models/profile.interface';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';
import { AvatarCircleComponent } from '../../../../shared/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'tt-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input.required<Profile>();
}
