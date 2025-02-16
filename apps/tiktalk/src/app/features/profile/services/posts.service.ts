import { inject, Injectable, signal } from '@angular/core';
import { Post, PostsCreateDto } from '../models/posts';
import { PostsDataService } from './posts-data.service';
import { map, switchMap, tap } from 'rxjs';
import { CommentCreateDto } from '../models/comment';

@Injectable()
export class PostsService {
  private readonly postsDataService = inject(PostsDataService);

  posts = signal<Post[]>([]);

  createPost(payload: PostsCreateDto) {
    return this.postsDataService
      .createPost(payload)
      .pipe(switchMap((res) => this.fetchPosts(res.author.id)));
  }

  fetchPosts(userId: number) {
    return this.postsDataService.fetchPosts(userId).pipe(tap((posts) => this.posts.set(posts)));
  }

  createComment(payload: CommentCreateDto) {
    return this.postsDataService
      .createComment(payload)
      .pipe(switchMap((res) => this.getCommentsByPostId(res.postId)));
  }

  getCommentsByPostId(postId: number) {
    return this.postsDataService.getPostById(postId).pipe(map((posts) => posts.comments));
  }
}
