import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../../../shared/models/profile.interface';
import {ImageUrlPipe} from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'tt-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  imports: [
    ImageUrlPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  profile = input.required<Profile>()
}
