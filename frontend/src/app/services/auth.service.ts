import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { delay, Observable, of, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginResponse.model';
import { Register } from '../models/register.model';
import { reset, set } from '../store/actions/user.actions';
import { State } from '../store/reducers/user.reducer';
import { ComponentCommunicationService } from './componentCommunication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = environment.baseUrl;
  private token$ = new Subscription();
  public user$: Observable<State>;

  constructor(
    private http: HttpClient,
    private componentCommunicationService: ComponentCommunicationService,
    private store: Store<{ user: State }>
  ) {
    this.user$ = store.select('user');
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.BASE_URL}/login`, { email, password })
      .pipe(tap((res: LoginResponse) => this.setSession(res)));
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration(): moment.Moment {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt') || '{}');
    return moment(expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.dispatch(reset());
  }

  private setSession(res: LoginResponse): void {
    const expiresAt = moment().add(1, 'h');
    localStorage.setItem('token', res.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(res.user));
    this.store.dispatch(set({ user: res.user }));
    this.expirationCounter();
  }

  public register(data: Register): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  private expirationCounter(): void {
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
