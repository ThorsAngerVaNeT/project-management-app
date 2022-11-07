import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { HttpTokenInterceptor } from './http-token.interceptor';

describe('HttpTokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpTokenInterceptor, provideMockStore()],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpTokenInterceptor = TestBed.inject(HttpTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
