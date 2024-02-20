/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PointsService } from './points.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIMethods } from '@core/enums/api-methods.enum';
import {
  mockPoint3,
  mockPointArray,
  paramForNewPoint,
  paramForUpdatePoint,
  paramForUpdatePointsSet,
  updatedPoint,
  updatedPoints,
} from '@mocks/mock-points/mock-points';

describe('PointsService', () => {
  let service: PointsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PointsService],
    });

    service = TestBed.inject(PointsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPointsSet and return an array of Point', () => {
    const listPointIds: string[] = [mockPointArray[0]._id, mockPointArray[1]._id, mockPointArray[2]._id];
    service.getPointsSet(listPointIds).subscribe((data) => {
      expect(data.length).toBe(mockPointArray.length);
      expect(data).toEqual(mockPointArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.points}?ids=${listPointIds.join()}`,
    });

    request.flush(mockPointArray);
  });

  it('should call getPointsByUser and return an array of Points', () => {
    const userId = '1';
    service.getPointsByUser(userId).subscribe((data) => {
      expect(data.length).toBe(mockPointArray.length);
      expect(data).toEqual(mockPointArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.points}?userId=${userId}`,
    });

    request.flush(mockPointArray);
  });

  it('should call getPointsByTask and return an array of Points', () => {
    const taskId = '1';
    service.getPointsByTask(taskId).subscribe((data) => {
      expect(data.length).toBe(mockPointArray.length);
      expect(data).toEqual(mockPointArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.points}/${taskId}`,
    });

    request.flush(mockPointArray);
  });

  it('should call createPoint and return the Point', () => {
    service.createPoint(paramForNewPoint).subscribe((data) => {
      expect(data).toEqual(mockPoint3);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: APIEndpoints.points,
    });

    request.flush(mockPoint3);
  });

  it('should call updatePoint and return the updated Point', () => {
    const pointId = updatedPoint._id;

    service.updatePoint(pointId, paramForUpdatePoint).subscribe((data) => {
      expect(data).toEqual(updatedPoint);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PATCH,
      url: `${APIEndpoints.points}/${pointId}`,
    });

    req.flush(updatedPoint);
  });

  it('should call updatePointsSet and return the updated array of Points', () => {
    service.updatePointsSet(paramForUpdatePointsSet).subscribe((data) => {
      expect(data).toEqual(updatedPoints);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PATCH,
      url: APIEndpoints.points,
    });

    req.flush(updatedPoints);
  });

  it('should call deletePoint and return the deleted Point', () => {
    const mockPoint = mockPointArray[0];
    const pointId = mockPoint._id;

    service.deletePoint(pointId).subscribe((data) => {
      expect(data).toEqual(mockPoint);
    });

    const req = httpMock.expectOne({
      method: APIMethods.DELETE,
      url: `${APIEndpoints.points}/${pointId}`,
    });

    req.flush(mockPoint);
  });
});
