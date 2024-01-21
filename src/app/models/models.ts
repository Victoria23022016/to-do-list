export interface AuthData {
  username: string;
  password: string;
}

export interface UserState {
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoData {
  todos: Todo[];
}
