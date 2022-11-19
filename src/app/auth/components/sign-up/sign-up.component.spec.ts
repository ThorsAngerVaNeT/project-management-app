import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ScannedActionsSubject } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: NzModalRef, useValue: { service: null } },
        ScannedActionsSubject,
        NzModalService,
        {
          provide: StoreFacade,
          useValue: {
            getUsers: (): void => {},
          },
        },
      ],
      declarations: [SignUpComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
