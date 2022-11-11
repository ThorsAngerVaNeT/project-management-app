import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddComponent implements OnInit {
  isVisible = true;

  taskAddForm!: FormGroup;

  ngOnInit(): void {
    this.taskAddForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      responsible: new FormControl(),
      participants: new FormControl(),
    });
  }

  handleOk(): void {
    console.log('Button ok clicked');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
