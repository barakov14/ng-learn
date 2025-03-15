import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { RouterLink } from '@angular/router';
import { PostInputComponent } from '../ui/post-input/post-input.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { Post } from '../data-access/models/posts';
import { AvatarCircleComponent, Profile, TimeAgoPipe } from '@tt/common';

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
