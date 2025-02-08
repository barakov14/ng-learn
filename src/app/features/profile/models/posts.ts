export type PostsCreateDto = {
  title: string;
  content: string;
  authorId: number;
  communityId?: number;
};

export type Author = {
  id: number;
  username: string;
  avatarUrl: string;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: any[];
  city: string;
  description: string;
};

export type Post = {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Author;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: PostComment[];
};

export type PostComment = {
  id: number;
  text: string;
  author: Author;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
};
