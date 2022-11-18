import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StoreFacade } from '../../../core/services/store-facade/store-facade';
import { ColumnWithTasks } from '../../models/column.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnWithTasks;

  componentRef!: ComponentRef<ColumnComponent>;

  titleControl!: FormControl;

  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.titleControl = new FormControl('', Validators.required);
  }

  createColumn(): void {
    if (this.titleControl.valid) {
      const { boardId, order } = this.column;
      this.storeFacade.createColumn(boardId, { title: this.titleControl.value, order });
      this.deleteComponent();
    } else if (this.titleControl.invalid) {
      this.titleControl.markAsDirty();
      this.titleControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  deleteComponent(): void {
    this.componentRef.destroy();
  }
}
