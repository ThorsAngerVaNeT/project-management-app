/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BoardsService } from './boards.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIMethods } from '@core/enums/api-methods.enum';
import {
  mockBoard3,
  mockBoardArray,
  paramForNewBoard,
  paramForUpdateBoard,
  updatedBoard,
} from '@mocks/mock-boards/mock-boards';

describe('BoardsService', () => {
  let service: BoardsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardsService],
    });

    service = TestBed.inject(BoardsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBoards and return an array of Boards', () => {
    service.getBoards().subscribe((data) => {
      expect(data.length).toBe(mockBoardArray.length);
      expect(data).toEqual(mockBoardArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: APIEndpoints.boards,
    });

    request.flush(mockBoardArray);
  });

  it('should call getBoardsSet and return an array of Boards', () => {
    const listBoardIds: string[] = [mockBoardArray[0]._id, mockBoardArray[1]._id, mockBoardArray[2]._id];
    service.getBoardsSet(listBoardIds).subscribe((data) => {
      expect(data.length).toBe(mockBoardArray.length);
      expect(data).toEqual(mockBoardArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boardsSet}?ids=${listBoardIds.join()}`,
    });

    request.flush(mockBoardArray);
  });

  it('should call getBoardsByUser and return an array of Boards', () => {
    const userId = '1';
    service.getBoardsByUser(userId).subscribe((data) => {
      expect(data.length).toBe(mockBoardArray.length);
      expect(data).toEqual(mockBoardArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boardsSet}/${userId}`,
    });

    request.flush(mockBoardArray);
  });

  it('should call getBoard and return the Boards', () => {
    const mockBoard = mockBoardArray[0];
    const id = mockBoard._id;

    service.getBoard(id).subscribe((data) => {
      expect(data).toEqual(mockBoard);
    });

    const req = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boards}/${id}`,
    });

    req.flush(mockBoard);
  });

  it('should call createBoard and return the Board', () => {
    service.createBoard(paramForNewBoard).subscribe((data) => {
      expect(data).toEqual(mockBoard3);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: APIEndpoints.boards,
    });

    request.flush(mockBoard3);
  });

  it('should call updateBoard and return the updated Board', () => {
    const id = updatedBoard._id;

    service.updateBoard(id, paramForUpdateBoard).subscribe((data) => {
      expect(data).toEqual(updatedBoard);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PUT,
      url: `${APIEndpoints.boards}/${id}`,
    });

    req.flush(updatedBoard);
  });

  it('should call deleteBoard and return the deleted Board', () => {
    const mockBoard = mockBoardArray[0];
    const id = mockBoard._id;

    service.deleteBoard(id).subscribe((data) => {
      expect(data).toEqual(mockBoard);
    });

    const req = httpMock.expectOne({
      method: APIMethods.DELETE,
      url: `${APIEndpoints.boards}/${id}`,
    });

    req.flush(mockBoard);
  });
});
