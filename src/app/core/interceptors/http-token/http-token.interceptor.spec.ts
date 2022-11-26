/* eslint-disable max-lines-per-function */
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectToken } from '@auth/store/selectors/auth.selectors';

import { APIEndpoints } from '../../enums/api-endpoints.enum';
import { APIMethods } from '../../enums/api-methods.enum';
import { HttpTokenInterceptor } from './http-token.interceptor';

describe('HttpTokenInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpTokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTokenInterceptor,
          multi: true,
        },
        provideMockStore({ initialState: { user: { token: 'TEST_TOKEN' } } }),
      ],
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    const interceptor: HttpTokenInterceptor = TestBed.inject(HttpTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization token to request header', () => {
    client.get(APIEndpoints.users).subscribe((res) => expect(res).toBeTruthy());

    const requests = httpMock.match({ method: APIMethods.GET });

    store.select(selectToken).subscribe((state) => {
      const token = `Bearer ${state}`;
      expect(requests[0].request.headers.has('Authorization')).toEqual(true);
      expect(requests[0].request.headers.get('Authorization')).toEqual(token);
    });
  });

  it('should not add authorization token to request header if its auth endpoints', () => {
    client.get(APIEndpoints.auth).subscribe((res) => expect(res).toBeTruthy());

    const requests = httpMock.match({ method: APIMethods.GET });

    expect(requests[0].request.headers.has('Authorization')).toEqual(false);
  });
});
