export interface UserPreview {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface UserFull extends UserPreview {
  gender: string;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  location: Location;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface PostCreate {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner: string;
}

export interface PostPreview {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate: string;
  owner: UserPreview;
}

export interface Post extends PostPreview {
  link?: string;
}

export interface CommentCreate {
  message: string;
  owner: string;
  post: string;
}

export interface Comment {
  id: string;
  message: string;
  owner: UserPreview;
  post: string;
  publishDate: string;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
