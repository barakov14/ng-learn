import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PostComment } from '@tt/posts/data-access';
import { AvatarCircleComponent } from '@tt/common/ui';
import { TimeAgoPipe } from '@tt/common/utils';
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
