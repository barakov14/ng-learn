import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { Post, PostComment } from '@tt/posts/data-access';
import { AvatarCircleComponent } from '@tt/common/ui';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostInputComponent } from '@tt/posts/ui';
import { PostCommentComponent } from '@tt/posts/feature-posts-comment';
import { PostsService } from '@tt/posts/data-access';
import { lastValueFrom } from 'rxjs';
import { TimeAgoPipe } from '@tt/common/utils';
import { RouterLink } from '@angular/router';

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
export class PostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  readonly post = input.required<Post>();
  protected readonly comment = signal<PostComment[]>([]);

  ngOnInit() {
    this.comment.set(this.post().comments);
  }

  async onCreated(commentText: string) {
    await lastValueFrom(
      this.postsService.createComment({
        authorId: this.post().author.id,
        text: commentText,
        postId: this.post().id,
      }),
    );

    const comments = await lastValueFrom(this.postsService.getCommentsByPostId(this.post().id));

    this.comment.set(comments);
  }
}
