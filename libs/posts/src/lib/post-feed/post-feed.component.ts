import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PostComponent } from '../post/post.component';
import { debounceTime, fromEvent, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { PostInputComponent } from '../ui/post-input/post-input.component';
import { selectPosts, selectPostsLoadingIndicator } from '../data-access/store/posts.selectors';
import { postsActions } from '../data-access/store/posts.actions';
import { AuthService, Profile } from '@tt/common';

@Component({
  selector: 'tt-post-feed',
  imports: [PostComponent, PostInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnInit {
  readonly #hostEl = inject(ElementRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #r2 = inject(Renderer2);
  readonly #store = inject(Store);
  protected readonly currentUser = inject(AuthService).currentUser;
  readonly profile = input.required<Profile>();
  protected readonly loadingIndicator = this.#store.selectSignal(selectPostsLoadingIndicator);

  protected readonly feed = computed(() => {
    const profile = this.profile();
    return this.#store.selectSignal(selectPosts(profile.id))();
  });

  @HostBinding('class.has-overflow') get hasOverflow() {
    return this.feed().length >= 2;
  }

  constructor() {
    effect(() => {
      this.#store.dispatch(postsActions.requestFetchPosts({ userId: this.profile().id }));
    });
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(startWith(undefined), debounceTime(300), takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.#hostEl.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top;

    this.#r2.setStyle(this.#hostEl.nativeElement, 'height', `${height}px`);
  }

  onCreateComment(postId: number, text: string) {
    this.#store.dispatch(
      postsActions.requestCreateComment({
        payload: {
          text,
          postId,
          authorId: this.currentUser()!.id,
        },
      }),
    );
  }

  onCreatePost(postText: string) {
    this.#store.dispatch(
      postsActions.requestCreatePost({
        payload: {
          title: 'Angular is amazing',
          content: postText,
          authorId: this.profile().id,
        },
      }),
    );
  }
}
