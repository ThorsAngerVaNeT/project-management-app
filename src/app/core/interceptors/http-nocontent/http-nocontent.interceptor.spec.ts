import { TestBed } from '@angular/core/testing';

import { HttpNoContentInterceptor } from './http-nocontent.interceptor';

describe('HttpNoContentInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpNoContentInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpNoContentInterceptor = TestBed.inject(HttpNoContentInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
