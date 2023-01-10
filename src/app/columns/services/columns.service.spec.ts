/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ColumnsService } from './columns.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIMethods } from '@core/enums/api-methods.enum';
import {
  mockColumn3,
  mockColumnArray,
  paramForNewColumn,
  paramForNewColumnsSet,
  paramForUpdateColumn,
  paramForUpdateColumnsSet,
  updatedColumn,
  updatedColumns,
} from '@mocks/mock-columns/mock-columns';

describe('ColumnsService', () => {
  let service: ColumnsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ColumnsService],
    });

    service = TestBed.inject(ColumnsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getColumnUrl(boardId) and return an correct url', () => {
    const boardId = mockColumnArray[0].boardId;
    const mockUrl = `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}`;

    // @ts-expect-error
    expect(service.getColumnUrl(boardId)).toEqual(mockUrl);
  });

  it('should call getColumnUrl(boardId, columnId) and return an correct url', () => {
    const boardId = mockColumnArray[0].boardId;
    const columnId = mockColumnArray[0]._id;
    const mockUrl = `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`;

    // @ts-expect-error
    expect(service.getColumnUrl(boardId, columnId)).toEqual(mockUrl);
  });

  it('should call getColumns and return an array of Columns', () => {
    const boardId = mockColumnArray[0].boardId;

    service.getColumns(boardId).subscribe((data) => {
      expect(data.length).toBe(mockColumnArray.length);
      expect(data).toEqual(mockColumnArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}`,
    });

    request.flush(mockColumnArray);
  });

  it('should call getColumnsSet and return an array of Columns', () => {
    const listColumnIds: string[] = [mockColumnArray[0]._id, mockColumnArray[1]._id, mockColumnArray[2]._id];
    service.getColumnsSet(listColumnIds).subscribe((data) => {
      expect(data.length).toBe(mockColumnArray.length);
      expect(data).toEqual(mockColumnArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.columnsSet}?ids=${listColumnIds.join()}`,
    });

    request.flush(mockColumnArray);
  });

  it('should call getColumnsByUser and return an array of Columns', () => {
    const userId = '1';
    service.getColumnsByUser(userId).subscribe((data) => {
      expect(data.length).toBe(mockColumnArray.length);
      expect(data).toEqual(mockColumnArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.columnsSet}?userId=${userId}`,
    });

    request.flush(mockColumnArray);
  });

  it('should call getColumn and return the Column', () => {
    const mockColumn = mockColumnArray[0];
    const boardId = mockColumn.boardId;
    const columnId = mockColumn._id;

    service.getColumn(boardId, columnId).subscribe((data) => {
      expect(data).toEqual(mockColumn);
    });

    const req = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`,
    });

    req.flush(mockColumn);
  });

  it('should call createColumn and return the Column', () => {
    const boardId = mockColumn3.boardId;
    service.createColumn(boardId, paramForNewColumn).subscribe((data) => {
      expect(data).toEqual(mockColumn3);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}`,
    });

    request.flush(mockColumn3);
  });

  it('should call createColumnSet and return an array of Columns', () => {
    service.createColumnsSet(paramForNewColumnsSet).subscribe((data) => {
      expect(data).toEqual(mockColumnArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: APIEndpoints.columnsSet,
    });

    request.flush(mockColumnArray);
  });

  it('should call updateColumn and return the updated Column', () => {
    const boardId = updatedColumn.boardId;
    const columnId = updatedColumn._id;

    service.updateColumn(boardId, columnId, paramForUpdateColumn).subscribe((data) => {
      expect(data).toEqual(updatedColumn);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PUT,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`,
    });

    req.flush(updatedColumn);
  });

  it('should call updateColumnsSet and return the updated array of Columns', () => {
    service.updateColumnsSet(paramForUpdateColumnsSet).subscribe((data) => {
      expect(data).toEqual(updatedColumns);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PATCH,
      url: APIEndpoints.columnsSet,
    });

    req.flush(updatedColumns);
  });

  it('should call deleteColumn and return the deleted Column', () => {
    const mockColumn = mockColumnArray[0];
    const boardId = mockColumn.boardId;
    const columnId = mockColumn._id;

    service.deleteColumn(boardId, columnId).subscribe((data) => {
      expect(data).toEqual(mockColumn);
    });

    const req = httpMock.expectOne({
      method: APIMethods.DELETE,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`,
    });

    req.flush(mockColumn);
  });
});
