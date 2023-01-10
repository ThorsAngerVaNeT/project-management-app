import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ColumnAddComponent } from './column-add.component';

describe('ColumnAddComponent', () => {
  let component: ColumnAddComponent;
  let fixture: ComponentFixture<ColumnAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnAddComponent],
      providers: [provideMockStore(), { provide: NzModalRef, useValue: { service: null } }],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
