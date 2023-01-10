import { TestBed } from '@angular/core/testing';

import { HttpTimeoutInterceptor } from './http-timeout.interceptor';

describe('HttpTimeoutInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpTimeoutInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpTimeoutInterceptor = TestBed.inject(HttpTimeoutInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
