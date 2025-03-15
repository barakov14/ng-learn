import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostComment } from '../data-access/models/posts';
import { AvatarCircleComponent, TimeAgoPipe } from '@tt/common';

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
