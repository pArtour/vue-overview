import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { Post } from 'src/models/post';

class PostsService {
  getAll(): Promise<AxiosResponse<Post[]>> {
    return api.get('posts');
  }

  getPost(id: string): Promise<AxiosResponse<Post>> {
    return api.get(`posts/${id}`);
  }

  createPost(data: {
    title: string;
    text: string;
  }): Promise<AxiosResponse<Post>> {
    return api.post<Post>('/posts', data);
  }

  update(
    id: number,
    data: { title: string; text: string }
  ): Promise<AxiosResponse<Post>> {
    return api.put<Post>(`/posts/${id}`, data);
  }

  delete(id: number): Promise<void> {
    return api.delete(`/posts/${id}`);
  }
}

export default new PostsService();
