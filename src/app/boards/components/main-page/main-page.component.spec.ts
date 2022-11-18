import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreFacade } from '@core/services/store-facade/store-facade';

import { MainPageComponent } from './main-page.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Overlay } from '@angular/cdk/overlay';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      providers: [provideMockStore(), NzModalService, Overlay],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(StoreFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
