import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { BoardAddComponent } from './board-add.component';

describe('BoardAddComponent', () => {
  let component: BoardAddComponent;
  let fixture: ComponentFixture<BoardAddComponent>;
  let actions$: Observable<Action>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardAddComponent],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        NzModalService,
        { provide: NzModalRef, useValue: {} },
      ],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
