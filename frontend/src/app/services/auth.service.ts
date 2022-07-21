import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, Subscription, tap } from 'rxjs';
import { LoginResponse } from '../models/loginResponse.model';
import { Register } from '../models/register.model';
import { AppStateService } from './appState.service';
import { DateHelperService } from './dateHelper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public BASE_URL = '/api';
  private token$ = new Subscription();

  constructor(
    private http: HttpClient,
    private appStateService: AppStateService,
    private dateHelperService: DateHelperService
  ) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(
        `${this.BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(tap((res: LoginResponse) => this.setSession(res)));
  }

  public isLoggedIn(): boolean {
    return new Date() < this.getExpiration();
  }

  public getExpiration(): Date {
    const expiresAt = parseInt(
      localStorage.getItem('expiresAt') || new Date().valueOf().toString()
    );
    return new Date(expiresAt);
  }

  public logout(): Observable<any> {
    return this.http.get('/api/logout').pipe(
      tap((res: any) => {
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('user');
        this.appStateService.setState({ currentUser: undefined });
      })
    );
  }

  public setSession(res: LoginResponse): void {
    const expiresAt = this.dateHelperService.addHours(1);
    localStorage.setItem('expiresAt', expiresAt.valueOf().toString());
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
