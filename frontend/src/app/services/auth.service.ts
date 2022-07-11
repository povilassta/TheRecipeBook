import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { delay, Observable, of, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginResponse.model';
import { Register } from '../models/register.model';
import { AppStateService } from './appState.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public BASE_URL = environment.baseUrl;
  private token$ = new Subscription();

  constructor(
    private http: HttpClient,
    private appStateService: AppStateService
  ) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.BASE_URL}/login`, { email, password })
      .pipe(tap((res: LoginResponse) => this.setSession(res)));
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getExpiration(): moment.Moment {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt') || '{}');
    return moment(expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.appStateService.setState({ currentUser: undefined });
  }

  public setSession(res: LoginResponse): void {
    const expiresAt = moment().add(1, 'h');
    localStorage.setItem('token', res.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(res.user));
    this.appStateService.setState({ currentUser: res.user });
    this.expirationCounter();
  }

  public register(data: Register): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  public expirationCounter(): void {
    const timeout = new Date();
    timeout.setHours(timeout.getHours() + 1);
    this.token$.unsubscribe();
    this.token$ = of(null)
      .pipe(delay(timeout))
      .subscribe(() => {
        console.log('Token expired');
        this.logout();
      });
  }
}
