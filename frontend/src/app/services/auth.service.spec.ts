import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import * as moment from 'moment';
import { LoginResponse } from '../models/loginResponse.model';
import { Register } from '../models/register.model';
import { AppStateService } from './appState.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  // localstorage
  let store: any;
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };

  // state management
  let appStateService: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    appStateService = TestBed.inject(AppStateService);

    // Mock localstorage
    store = {} as any;

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    spyOn(appStateService, 'setState');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setSession on success', (done: DoneFn) => {
    spyOn(service, 'setSession');
    // Test data
    const res: LoginResponse = {
      token: 'token',
      expiresIn: '1h',
      user: {
        _id: '1',
        username: 'test',
        profilePictureUrl: 'test',
        email: 'test',
      },
    };

    service.login('email', 'pass').subscribe(() => {
      expect(service.setSession).toHaveBeenCalledOnceWith(res);
      done();
    });

    // Mock request
    httpController
      .expectOne({
        method: 'POST',
        url: `${service.BASE_URL}/login`,
      })
      .flush(res);
  });

  it('should return true if token is not expired', () => {
    spyOn(service, 'getExpiration').and.returnValue(moment().add(1, 'hours'));
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return correct expiration date', () => {
    // Mock data
    const expiresAt = moment().add(1, 'h');
    mockLocalStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    expect(service.getExpiration().valueOf()).toEqual(expiresAt.valueOf());
  });

  it('should return now date', () => {
    expect(service.getExpiration().valueOf()).toEqual(moment().valueOf());
  });

  it('should clear storage', () => {
    mockLocalStorage.setItem('token', 'token');
    mockLocalStorage.setItem('expiresAt', 'sometime');
    mockLocalStorage.setItem('user', 'user');

    service.logout();

    expect(store).toEqual({});
    expect(appStateService.setState).toHaveBeenCalledOnceWith({
      currentUser: undefined,
    });
  });

  it('should set localstorage fields', () => {
    // Mock data
    const res: LoginResponse = {
      token: 'token',
      expiresIn: '1h',
      user: {
        _id: '1',
        username: 'test',
        profilePictureUrl: 'test',
        email: 'test',
      },
    };

    service.setSession(res);

    expect(store.token).toBe(res.token);
    expect(store.expiresAt).toBeTruthy();
    expect(store.user).toBe(JSON.stringify(res.user));
    expect(appStateService.setState).toHaveBeenCalledOnceWith({
      currentUser: res.user,
    });
  });

  it('should call post once with correct data and url', (done: DoneFn) => {
    spyOn(httpClient, 'post').and.callThrough();
    // Mock data
    const registerData: Register = {
      email: 'email',
      username: 'username',
      password: 'password',
      repeatPassword: 'password',
    };

    service.register(registerData).subscribe(() => {
      expect(httpClient.post).toHaveBeenCalledOnceWith(
        `${service.BASE_URL}/register`,
        registerData
      );
      done();
    });

    // Mock request
    httpController
      .expectOne({
        method: 'POST',
        url: `${service.BASE_URL}/register`,
      })
      .flush({});
  });
  it('should call logout after one hour', fakeAsync(() => {
    spyOn(service, 'logout');
    service.expirationCounter();
    tick(3600000);
    expect(service.logout).toHaveBeenCalledTimes(1);
  }));
});
