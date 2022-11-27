import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mockPoint1 } from '@mocks/mock-points/mock-points';

import { PointItemComponent } from './point-item.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PointItemComponent', () => {
  let component: PointItemComponent;
  let fixture: ComponentFixture<PointItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointItemComponent],
      providers: [provideMockStore(), NzModalService, Overlay],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PointItemComponent);
    component = fixture.componentInstance;
    component.point = mockPoint1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
