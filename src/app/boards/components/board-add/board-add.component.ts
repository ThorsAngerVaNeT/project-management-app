import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent implements OnInit {
  isVisible = true;

  boardAddForm!: FormGroup;

  ngOnInit(): void {
    this.boardAddForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      participants: new FormControl(),
      image: new FormControl(),
    });
  }

  handleOk(): void {
    console.log('Button ok clicked');
    if (this.boardAddForm.valid) {
      console.log(this.boardAddForm.value);
    } else {
      Object.values(this.boardAddForm.controls).forEach((control) => {
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
