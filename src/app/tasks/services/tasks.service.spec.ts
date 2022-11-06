/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIMethods } from '@core/enums/api-methods.enum';
import {
  mockTask3,
  mockTaskArray,
  paramForNewTask,
  paramForUpdateTask,
  paramForUpdateTasksSet,
  updatedTask,
  updatedTasks,
} from '@mocks/mock-tasks/mock-tasks';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });

    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTaskUrl(boardId, columnId) and return an correct url', () => {
    const boardId = mockTaskArray[0].boardId;
    const columnId = mockTaskArray[0].columnId;
    const mockUrl = `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}`;

    // @ts-expect-error
    expect(service.getTaskUrl(boardId, columnId)).toEqual(mockUrl);
  });

  it('should call getTaskUrl(boardId, columnId, taskId) and return an correct url', () => {
    const boardId = mockTaskArray[0].boardId;
    const columnId = mockTaskArray[0].columnId;
    const taskId = mockTaskArray[0]._id;
    const mockUrl = `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}/${taskId}`;

    // @ts-expect-error
    expect(service.getTaskUrl(boardId, columnId, taskId)).toEqual(mockUrl);
  });

  it('should call getTasks and return an array of Tasks', () => {
    const boardId = mockTaskArray[0].boardId;
    const columnId = mockTaskArray[0].columnId;

    service.getTasks(boardId, columnId).subscribe((data) => {
      expect(data.length).toBe(mockTaskArray.length);
      expect(data).toEqual(mockTaskArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}`,
    });

    request.flush(mockTaskArray);
  });

  it('should call getTasksSet and return an array of Tasks', () => {
    const listTaskIds: string[] = [mockTaskArray[0]._id, mockTaskArray[1]._id, mockTaskArray[2]._id];
    service.getTasksSet(listTaskIds).subscribe((data) => {
      expect(data.length).toBe(mockTaskArray.length);
      expect(data).toEqual(mockTaskArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.tasksSet}?ids=${listTaskIds.join()}`,
    });

    request.flush(mockTaskArray);
  });

  it('should call getTasksByUser and return an array of Tasks', () => {
    const userId = '1';
    service.getTasksByUser(userId).subscribe((data) => {
      expect(data.length).toBe(mockTaskArray.length);
      expect(data).toEqual(mockTaskArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.tasksSet}?userId=${userId}`,
    });

    request.flush(mockTaskArray);
  });

  it('should call getTasksByBoard and return an array of Tasks', () => {
    const boardId = '1';
    service.getTasksByBoard(boardId).subscribe((data) => {
      expect(data.length).toBe(mockTaskArray.length);
      expect(data).toEqual(mockTaskArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.tasksSet}/${boardId}`,
    });

    request.flush(mockTaskArray);
  });

  it('should call getTasksBySearchString and return an array of Tasks', () => {
    const searchStr = 'title';
    service.getTasksBySearchString(searchStr).subscribe((data) => {
      expect(data.length).toBe(mockTaskArray.length);
      expect(data).toEqual(mockTaskArray);
    });

    const request = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.tasksSet}?search=${searchStr}`,
    });

    request.flush(mockTaskArray);
  });

  it('should call getTask and return the Task', () => {
    const mockTask = mockTaskArray[0];
    const boardId = mockTask.boardId;
    const columnId = mockTask.columnId;
    const taskId = mockTask._id;

    service.getTask(boardId, columnId, taskId).subscribe((data) => {
      expect(data).toEqual(mockTask);
    });

    const req = httpMock.expectOne({
      method: APIMethods.GET,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}/${taskId}`,
    });

    req.flush(mockTask);
  });

  it('should call createTask and return the Task', () => {
    const boardId = mockTask3.boardId;
    const columnId = mockTask3.columnId;

    service.createTask(boardId, columnId, paramForNewTask).subscribe((data) => {
      expect(data).toEqual(mockTask3);
    });

    const request = httpMock.expectOne({
      method: APIMethods.POST,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}`,
    });

    request.flush(mockTask3);
  });

  it('should call updateTask and return the updated Task', () => {
    const boardId = updatedTask.boardId;
    const columnId = updatedTask.columnId;
    const taskId = updatedTask._id;

    service.updateTask(boardId, columnId, taskId, paramForUpdateTask).subscribe((data) => {
      expect(data).toEqual(updatedTask);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PUT,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}/${taskId}`,
    });

    req.flush(updatedTask);
  });

  it('should call updateColumnsSet and return the updated array of Tasks', () => {
    service.updateTasksSet(paramForUpdateTasksSet).subscribe((data) => {
      expect(data).toEqual(updatedTasks);
    });

    const req = httpMock.expectOne({
      method: APIMethods.PATCH,
      url: APIEndpoints.tasksSet,
    });

    req.flush(updatedTasks);
  });

  it('should call deleteTask and return the deleted Task', () => {
    const mockTask = mockTaskArray[0];
    const boardId = mockTask.boardId;
    const columnId = mockTask.columnId;
    const taskId = mockTask._id;

    service.deleteTask(boardId, columnId, taskId).subscribe((data) => {
      expect(data).toEqual(mockTask);
    });

    const req = httpMock.expectOne({
      method: APIMethods.DELETE,
      url: `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}/${taskId}`,
    });

    req.flush(mockTask);
  });
});
