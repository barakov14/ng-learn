import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '../../../../../shared/models/profile.interface';
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tt-chat-workspace-header',
  imports: [AvatarCircleComponent, RouterLink],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceHeaderComponent {
  readonly profile = input.required<Profile>();
}
