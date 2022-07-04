import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const set = createAction('User Set', props<{ user: User }>());
export const reset = createAction('User Reset');
