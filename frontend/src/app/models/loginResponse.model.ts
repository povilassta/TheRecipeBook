import { User } from './user.model';

export interface LoginResponse {
  token: string;
  expiresIn: string;
  user: User;
}
