import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private $state: BehaviorSubject<AppState>;
  private get state(): AppState {
    return this.$state.getValue();
  }

  constructor() {
    this.$state = new BehaviorSubject<AppState>(initialState);
  }

  public select(key: string): Observable<any> {
    return this.$state.asObservable().pipe(
      map((state: AppState) => state[key as keyof AppState]),
      distinctUntilChanged()
    );
  }

  public setState(newState: Partial<AppState>) {
    this.$state.next({
      ...this.state,
      ...newState,
    });
  }
}

const initialState: AppState = localStorage.getItem('user')
  ? {
      currentUser: JSON.parse(localStorage.getItem('user') || ''),
    }
  : {
      currentUser: undefined,
    };

interface AppState {
  currentUser: User | undefined;
}
