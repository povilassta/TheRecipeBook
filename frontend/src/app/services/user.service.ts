import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {}

  public getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}${userId}`);
  }
}
