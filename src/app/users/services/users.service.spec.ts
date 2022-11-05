/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { mockUserArray, paramForUpdateUser, updatedUser } from '@mocks/mock-users/mock-users';
import { APIMethods } from '../../core/enums/api-methods.enum';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers and return an array of Users', () => {
    service.getUsers().subscribe((data) => {
      expect(data.length).toBe(mockUserArray.length);
      expect(data).toEqual(mockUserArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: APIEndpoints.users,
    });

    request.flush(mockUserArray);
  });

  it('should call getUser and return the User', () => {
    const mockUser = mockUserArray[0];
    const id = mockUser._id;

    service.getUser(id).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });

    const req = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.users}/${id}`,
    });

    req.flush(mockUser);
  });

  it('should call updateUser and return the updated User', () => {
    const id = updatedUser._id;

    service.updateUser(id, paramForUpdateUser).subscribe((data) => {
      expect(data).toEqual(updatedUser);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PUT,
      url: `${APIEndpoints.users}/${id}`,
    });

    req.flush(updatedUser);
  });

  it('should call deleteUser and return the deleted User', () => {
    const mockUser = mockUserArray[0];
    const id = mockUser._id;

    service.deleteUser(id).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });

    const req = httpMock.expectOne({
      method: APIMethods.DELETE,
      url: `${APIEndpoints.users}/${id}`,
    });

    req.flush(mockUser);
  });
});
