import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../../../shared/models/profile.interface';
import {ImageUrlPipe} from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'tt-profile-header',
  imports: [
    ImageUrlPipe
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent {
  profile = input.required<Profile>()
}
