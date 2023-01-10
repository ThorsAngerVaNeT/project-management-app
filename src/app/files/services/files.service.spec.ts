/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FilesService } from './files.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIMethods } from '@core/enums/api-methods.enum';
import { mockFile3, mockFileArray, newFile } from '@mocks/mock-files/mock-files';

describe('FilesService', () => {
  let service: FilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilesService],
    });

    service = TestBed.inject(FilesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getFilesSet and return an array of File', () => {
    const listFileIds: string[] = [mockFileArray[0]._id, mockFileArray[1]._id, mockFileArray[2]._id];
    service.getFilesSet(listFileIds).subscribe((data) => {
      expect(data.length).toBe(mockFileArray.length);
      expect(data).toEqual(mockFileArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.file}?ids=${listFileIds.join()}`,
    });

    request.flush(mockFileArray);
  });

  it('should call getFilesByUser and return an array of File', () => {
    const userId = '1';
    service.getFilesByUser(userId).subscribe((data) => {
      expect(data.length).toBe(mockFileArray.length);
      expect(data).toEqual(mockFileArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.file}?userId=${userId}`,
    });

    request.flush(mockFileArray);
  });

  it('should call getFilesByTask and return an array of File', () => {
    const taskId = '1';
    service.getFilesByTask(taskId).subscribe((data) => {
      expect(data.length).toBe(mockFileArray.length);
      expect(data).toEqual(mockFileArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.file}?taskId=${taskId}`,
    });

    request.flush(mockFileArray);
  });

  it('should call getFilesByBoard and return an array of File', () => {
    const boardId = '1';
    service.getFilesByBoard(boardId).subscribe((data) => {
      expect(data.length).toBe(mockFileArray.length);
      expect(data).toEqual(mockFileArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.file}/${boardId}`,
    });

    request.flush(mockFileArray);
  });

  it('should call deleteFile and return the deleted File', () => {
    const mockFile = mockFileArray[0];
    const fileId = mockFile._id;

    service.deleteFile(fileId).subscribe((data) => {
      expect(data).toEqual(mockFile);
    });

    const req = httpMock.expectOne({
      method: APIMethods.DELETE,
      url: `${APIEndpoints.file}/${fileId}`,
    });

    req.flush(mockFile);
  });

  it('should call uploadFile and return the File', () => {
    const mockFile = mockFileArray[2];
    const boardId = mockFile.boardId;
    const taskId = mockFile.taskId;

    service.uploadFile(boardId, taskId, newFile).subscribe((data) => {
      expect(data).toEqual(mockFile3);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: APIEndpoints.file,
    });

    request.flush(mockFile3);
  });
});
