import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ScannedActionsSubject } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { SignUpComponent } from './sign-up.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: NzModalRef, useValue: { service: null } },
        ScannedActionsSubject,
        NzModalService,
        Overlay,
        provideMockStore(),
      ],
      declarations: [SignUpComponent],
      imports: [TranslateModule.forRoot()],
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
