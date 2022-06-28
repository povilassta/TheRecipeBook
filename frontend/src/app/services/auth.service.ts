import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginResponse.model';
import { Register } from '../models/register.model';
import { ComponentCommunicationService } from './componentCommunication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.BASE_URL}/login`, { email, password })
      .pipe(tap((res: LoginResponse) => this.setSession(res)));
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt') || '{}');
    return moment(expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.componentCommunicationService.callUpdateUser();
  }

  private setSession(res: LoginResponse): void {
    const expiresAt = moment().add(1, 'h');
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('username', res.username);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  public register(data: Register): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }
}
