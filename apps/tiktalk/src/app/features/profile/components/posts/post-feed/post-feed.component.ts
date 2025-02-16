import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Profile } from '../../../../../shared/models/profile.interface';
import { PostComponent } from '../post/post.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostsDataService } from '../../../services/posts-data.service';
import { PostsService } from '../../../services/posts.service';
import { auditTime, debounceTime, fromEvent, lastValueFrom, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-post-feed',
  imports: [PostComponent, PostInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostsDataService, PostsService],
})
export class PostFeedComponent implements OnInit {
  private readonly hostEl = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly r2 = inject(Renderer2);
  private readonly postsService = inject(PostsService);
  readonly profile = input.required<Profile>();
  protected readonly feed = this.postsService.posts;

  @HostBinding('class.has-overflow') get hasOverflow() {
    return this.feed().length >= 2;
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(startWith(undefined), debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  fetchPosts(userId: number) {
    lastValueFrom(this.postsService.fetchPosts(userId));
  }

  resizeFeed() {
    const { top } = this.hostEl.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top;

    this.r2.setStyle(this.hostEl.nativeElement, 'height', `${height}px`);
  }

  onCreated(postText: string) {
    lastValueFrom(
      this.postsService.createPost({
        title: 'Angular is amazing',
        content: postText,
        authorId: this.profile().id,
      }),
    );
  }

  constructor() {
    effect(() => {
      if (this.profile()) {
        this.fetchPosts(this.profile().id);
      }
    });
  }
}
