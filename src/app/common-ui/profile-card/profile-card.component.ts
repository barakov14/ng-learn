import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tt-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {

}
