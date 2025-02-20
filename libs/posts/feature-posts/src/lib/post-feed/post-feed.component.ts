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
import { PostInputComponent } from '@tt/posts/ui';
import { postsActions, PostsDataService } from '@tt/posts/data-access';
import { PostsService } from '@tt/posts/data-access';
import { debounceTime, fromEvent, lastValueFrom, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Profile } from '@tt/common/data-access';
import { AuthService } from '@tt/auth/data-access';
import { Store } from '@ngrx/store';
import { selectPosts } from '../../../../data-access/src/lib/store/posts.selectors';

@Component({
  selector: 'tt-post-feed',
  imports: [PostComponent, PostInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnInit {
  private readonly hostEl = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly r2 = inject(Renderer2);
  private readonly store = inject(Store);
  protected readonly currentUser = inject(AuthService).currentUser;
  readonly profile = input.required<Profile>();

  protected readonly feed = computed(() => {
    const profile = this.profile();
    return this.store.selectSignal(selectPosts(profile.id))();
  });

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

  resizeFeed() {
    const { top } = this.hostEl.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top;

    this.r2.setStyle(this.hostEl.nativeElement, 'height', `${height}px`);
  }

  onCreated(postText: string) {
    /*lastValueFrom(
      this.postsService.createPost({
        title: 'Angular is amazing',
        content: postText,
        authorId: this.profile().id,
      }),
    );*/

    this.store.dispatch(
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
