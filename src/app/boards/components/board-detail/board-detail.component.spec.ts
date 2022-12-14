import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { mockBoard1 } from '@mocks/mock-boards/mock-boards';
import { StoreFacade } from '@core/services/store-facade/store-facade';

import { BoardDetailComponent } from './board-detail.component';
import { of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Overlay } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

describe('BoardDetailComponent', () => {
  let component: BoardDetailComponent;
  let fixture: ComponentFixture<BoardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardDetailComponent],
      providers: [
        {
          provide: StoreFacade,
          useValue: { getUsers: (): void => {}, boardDetail$: of() },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ boardId: mockBoard1._id }),
          },
        },
        provideMockStore({ initialState: {} }),
        NzModalService,
        Overlay,
      ],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardDetailComponent);
    component = fixture.componentInstance;
    component.columnsContainer = {
      nativeElement: document.createElement('div'),
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
