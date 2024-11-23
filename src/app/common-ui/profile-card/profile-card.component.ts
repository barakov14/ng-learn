import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImageUrlPipe} from '../../helpers/pipes/image-url.pipe';

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
