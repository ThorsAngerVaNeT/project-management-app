import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockColumn1 } from '@mocks/mock-columns/mock-columns';
import { provideMockStore } from '@ngrx/store/testing';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent],
      providers: [provideMockStore(), NzModalService, Overlay],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    component.column = { ...mockColumn1, tasks: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
