import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './posts.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { selectPosts } from './posts.selectors';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { PostsDataService } from '../services/posts-data.service';

@Injectable({ providedIn: 'root' })
export class PostsEffects {
  readonly #postsDataService = inject(PostsDataService);
  readonly #actions$ = inject(Actions);
  readonly #store = inject(Store);

  requestFetchPost$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(postsActions.requestFetchPosts),
      concatLatestFrom((action) => this.#store.select(selectPosts(action.userId))),
      switchMap(([action, posts]) =>
        posts.length > 0
          ? of(postsActions.fetchPostsSuccess({ posts }))
          : this.#postsDataService.fetchPosts(action.userId).pipe(
              map((posts) => postsActions.fetchPostsSuccess({ posts })),
              catchError((error) =>
                of(postsActions.fetchPostsFailure({ error: error.error.errors })),
              ),
            ),
      ),
    ),
  );

  requestCreatePost$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(postsActions.requestCreatePost),
      switchMap((action) =>
        this.#postsDataService.createPost(action.payload).pipe(
          map((post) => postsActions.createPostSuccess({ post })),
          catchError((error) => of(postsActions.createPostFailure({ error: error.error.errors }))),
        ),
      ),
    ),
  );

  requestCreateComment$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(postsActions.requestCreateComment),
      switchMap((action) =>
        this.#postsDataService.createComment(action.payload).pipe(
          map((comment) => postsActions.createCommentSuccess({ comment })),
          catchError((error) =>
            of(postsActions.createCommentFailure({ error: error.error.errors })),
          ),
        ),
      ),
    ),
  );
}
