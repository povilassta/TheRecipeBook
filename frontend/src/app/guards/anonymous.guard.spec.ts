import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnonymousGuard } from './anonymous.guard';

describe('AnonymousGuard', () => {
  let guard: AnonymousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    });
    guard = TestBed.inject(AnonymousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
