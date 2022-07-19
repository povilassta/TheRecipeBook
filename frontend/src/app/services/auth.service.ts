import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginResponse.model';
import { Register } from '../models/register.model';
import { AppStateService } from './appState.service';
import { DateHelperService } from './dateHelper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public BASE_URL = environment.baseUrl;
  private token$ = new Subscription();

  constructor(
    private http: HttpClient,
    private appStateService: AppStateService,
    private dateHelperService: DateHelperService
  ) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.BASE_URL}/login`, { email, password })
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

  public logout(): void {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.appStateService.setState({ currentUser: undefined });
  }

  public setSession(res: LoginResponse): void {
    const expiresAt = this.dateHelperService.addHours(1);
    localStorage.setItem('token', res.token);
    localStorage.setItem('expiresAt', expiresAt.valueOf().toString());
    localStorage.setItem('user', JSON.stringify(res.user));
    this.appStateService.setState({ currentUser: res.user });
    this.expirationCounter(expiresAt);
  }

  public register(data: Register): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  public expirationCounter(expiresAt: Date): void {
    this.token$.unsubscribe();
    console.log(expiresAt);
    this.token$ = of(null)
      .pipe(delay(expiresAt))
      .subscribe(() => {
        console.log('Token expired');
        this.logout();
      });
  }
}
