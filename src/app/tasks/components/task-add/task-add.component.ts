import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      description: new FormControl('', [Validators.maxLength(255)]),
      responsible: new FormControl('', [Validators.required]),
      participants: new FormControl(),
    });
  }

  handleOk(): void {
    console.log('Button ok clicked');
    if (this.taskAddForm.valid) {
      console.log(this.taskAddForm.value);
    } else {
      Object.values(this.taskAddForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
