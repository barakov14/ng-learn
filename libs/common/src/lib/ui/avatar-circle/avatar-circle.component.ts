import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageUrlPipe } from '../../utils/pipes/image-url.pipe';

@Component({
  selector: 'tt-avatar-circle',
  imports: [ImageUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCircleComponent {
  readonly avatarUrl = input.required<string>();
}
