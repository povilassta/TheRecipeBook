import { User } from './user.model';

export interface Comment {
  _id: string;
  user: User;
  recipeId: string;
  date: Date;
  content: string;
}
