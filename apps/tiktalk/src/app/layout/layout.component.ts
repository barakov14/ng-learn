import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiderbarComponent } from '@tt/common/ui';

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
