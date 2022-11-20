import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { mockTaskArray } from '@mocks/mock-tasks/mock-tasks';
import { mockUser1, mockUser2 } from '@mocks/mock-users/mock-users';
import { ColumnTasksWithColumnId } from '../../model/task.model';

import { TasksListComponent } from './tasks-list.component';

@Pipe({ name: 'sortByOrder' })
class MockPipe implements PipeTransform {
  transform<T extends { order: number }>(value: T[]): T[] {
    return value;
  }
}

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksListComponent, MockPipe],
      providers: [
        {
          provide: StoreFacade,
          useValue: {
            getUsers: (): void => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const mockTasksWithColumnId: ColumnTasksWithColumnId = {
      columnId: mockTaskArray[0].columnId,
      tasks: mockTaskArray.map((task) => ({ ...task, user: mockUser1, users: [mockUser2] })),
    };

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    component.tasksWithColumnId = mockTasksWithColumnId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
