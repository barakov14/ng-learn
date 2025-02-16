import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Post, PostComment } from '../../../models/posts';
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { PostsService } from '../../../services/posts.service';
import { lastValueFrom } from 'rxjs';
import { TimeAgoPipe } from '../../../../../shared/pipes/time-ago.pipe';
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
