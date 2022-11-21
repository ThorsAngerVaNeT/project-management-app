import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointItemComponent } from './point-item.component';

describe('PointItemComponent', () => {
  let component: PointItemComponent;
  let fixture: ComponentFixture<PointItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PointItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
