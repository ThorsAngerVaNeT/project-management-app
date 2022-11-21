import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Point } from '../../model/point.model';

@Component({
  selector: 'app-point-item',
  templateUrl: './point-item.component.html',
  styleUrls: ['./point-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointItemComponent implements OnInit {
  @Input() point!: Point;

  isChecked!: boolean;

  isEdit = false;

  titleControl!: FormControl;

  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.isChecked = this.point.done;
    this.titleControl = new FormControl(this.point.title, Validators.required);
  }

  toggleDone(): void {
    this.isChecked = !this.isChecked;
    this.updatePoint();
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  createPoint(): void {
    console.log('create');
  }

  updateTitle(): void {
    if (this.titleControl.valid) {
      this.toggleEdit();
      this.updatePoint();
    } else {
      this.titleControl.markAsDirty();
      this.titleControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  updatePoint(): void {
    const { _id: pointId } = this.point;
    const title = this.titleControl.value;

    this.storeFacade.updatePoint(pointId, { title, done: this.isChecked });
  }

  deletePoint(): void {
    console.log('delete point');
  }
}
