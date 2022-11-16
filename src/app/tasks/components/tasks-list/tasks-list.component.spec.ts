import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreFacade } from '@core/services/store-facade/store-facade';

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

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
