import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../models/profile.interface';
import {ImageUrlPipe} from '../../pipes/image-url.pipe';

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
