import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment';
import { APIEndpoints } from '../../enums/api-endpoints.enum';
import { APIMethods } from '../../enums/api-methods.enum';
import { HttpBaseInterceptor } from './http-base.interceptor';

describe('HttpBaseInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpBaseInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpBaseInterceptor,
          multi: true,
        },
      ],
    });
  });

  it('should be created', () => {
    const interceptor: HttpBaseInterceptor = TestBed.inject(HttpBaseInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add API_URL to request url', () => {
    const client = TestBed.inject(HttpClient);
    const httpMock = TestBed.inject(HttpTestingController);

    client.get(APIEndpoints.users).subscribe((res) => expect(res).toBeTruthy());

    const requests = httpMock.match({ method: APIMethods.GET });

    expect(requests[0].request.url.includes(environment.API_URL)).toEqual(true);
  });
});
