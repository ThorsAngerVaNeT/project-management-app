/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIMethods } from '@core/enums/api-methods.enum';
import { paramForNewUser, mockUser3, paramForLogin } from '@mocks/mock-users/mock-users';

describe('UsersService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signIn and return the token', () => {
    const mockToken = { token: 'test' };

    service.signIn(paramForLogin).subscribe((data) => {
      expect(data).toEqual(mockToken.token);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: APIEndpoints.signIn,
    });

    request.flush(mockToken);
  });

  it('should call signUp and return the User', () => {
    service.signUp(paramForNewUser).subscribe((data) => {
      expect(data).toEqual(mockUser3);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: APIEndpoints.signUp,
    });

    request.flush(mockUser3);
  });
});
