import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Board } from '@boards/model/board.model';
import { Column } from '../../model/column.model';

@Component({
  selector: 'app-column-add',
  templateUrl: './column-add.component.html',
  styleUrls: ['./column-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnAddComponent implements OnInit {
  boardId!: Board['_id'];

  order!: Column['order'];

  titleControl!: FormControl;

  constructor(private storeFacade: StoreFacade, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.titleControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  }

  handleOk(): void {
    if (this.titleControl.valid) {
      const { boardId, order } = this;
      this.storeFacade.createColumn(boardId, { title: this.titleControl.value, order });
      this.modal.destroy();
    } else if (this.titleControl.invalid) {
      this.titleControl.markAsDirty();
      this.titleControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  handleCancel(): void {
    this.modal.destroy();
  }
}
