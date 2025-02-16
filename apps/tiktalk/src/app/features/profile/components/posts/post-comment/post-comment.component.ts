import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PostComment } from '../../../models/posts';
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { TimeAgoPipe } from '../../../../../shared/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tt-post-comment',
  imports: [AvatarCircleComponent, TimeAgoPipe, RouterLink],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentComponent {
  readonly comment = input.required<PostComment>();
}
