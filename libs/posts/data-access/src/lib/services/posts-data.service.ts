import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post, PostComment, PostsCreateDto } from '../models/posts';
import { CommentCreateDto } from '../models/comment';

@Injectable()
export class PostsDataService {
  private readonly http = inject(HttpClient);

  createPost(payload: PostsCreateDto) {
    return this.http.post<Post>('/post/', payload);
  }

  fetchPosts(userId: number) {
    const params = new HttpParams().append('user_id', userId);

    return this.http.get<Post[]>('/post/', { params });
  }

  createComment(payload: CommentCreateDto) {
    return this.http.post<PostComment>('/comment/', payload);
  }

  /*getPostById(id: number) {
    return this.http.get<Post>(`/post/${id}`);
  }*/
}
