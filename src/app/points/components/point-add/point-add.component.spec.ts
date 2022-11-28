import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PointAddComponent } from './point-add.component';

describe('PointAddComponent', () => {
  let component: PointAddComponent;
  let fixture: ComponentFixture<PointAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointAddComponent],
      imports: [TranslateModule.forRoot()],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PointAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
