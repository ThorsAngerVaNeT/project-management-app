import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockTask1 } from '@mocks/mock-tasks/mock-tasks';
import { provideMockStore } from '@ngrx/store/testing';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mockUser1, mockUser2 } from '@mocks/mock-users/mock-users';

import { TaskItemComponent } from './task-item.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [provideMockStore(), NzModalService, Overlay],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = { ...mockTask1, user: mockUser1, users: [mockUser2], selected: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
