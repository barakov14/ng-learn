import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Post } from '@tt/posts/data-access';
import { AvatarCircleComponent } from '@tt/common/ui';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostInputComponent } from '@tt/posts/ui';
import { PostCommentComponent } from '@tt/posts/feature-posts-comment';
import { TimeAgoPipe } from '@tt/common/utils';
import { RouterLink } from '@angular/router';
import { Profile } from '@tt/common/data-access';

@Component({
  selector: 'tt-post',
  imports: [
    AvatarCircleComponent,
    FastSvgComponent,
    PostInputComponent,
    PostCommentComponent,
    TimeAgoPipe,
    RouterLink,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  readonly post = input.required<Post>();
  readonly currentUser = input.required<Profile>();
  readonly createComment = output<string>();
  readonly loadingIndicator = input.required<boolean>();

  onCreatedComment(commentText: string) {
    this.createComment.emit(commentText);
  }
}
