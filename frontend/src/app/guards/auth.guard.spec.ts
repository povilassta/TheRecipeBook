import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: spy }],
    });
    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login', () => {
    const createUrlTreeSpy = spyOn(router, 'createUrlTree').and.callThrough();
    authServiceSpy.isLoggedIn.and.returnValue(false);
    guard.canActivate(new ActivatedRouteSnapshot(), null as any);
    expect(createUrlTreeSpy).toHaveBeenCalledWith(['login']);
  });

  it('should return true', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    expect(
      guard.canActivate(new ActivatedRouteSnapshot(), null as any)
    ).toBeTrue();
  });
});
