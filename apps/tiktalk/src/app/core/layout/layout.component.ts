import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../features/profile/services/profile.service';
import { SiderbarComponent } from '../components/siderbar/siderbar.component';

@Component({
  selector: 'tt-layout',
  imports: [RouterOutlet, SiderbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  // private readonly profileService = inject(ProfileService);
}
