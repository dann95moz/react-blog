import axios from 'axios';
import { ListResponse, PostPreview, Post, Comment, UserPreview } from '../models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'app-id': import.meta.env.VITE_APP_ID,
  },
});

export const getPosts = (page: number = 1) => {
  return api.get<ListResponse<PostPreview>>(`/post?page=${page}`);
};

export const getPostById = (id: string) => {
  return api.get<Post>(`/post/${id}`);
};

export const getCommentsByPostId = (postId: string) => {
  return api.get<ListResponse<Comment>>(`/post/${postId}/comment`);
};

export const getUsers = () => {
  return api.get<ListResponse<UserPreview>>(`/user`);
};

export const getTags = () => {
  return api.get<{data:string[]}>(`/tag`);
};
