import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarCircleComponent, Profile } from '@tt/common';

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
