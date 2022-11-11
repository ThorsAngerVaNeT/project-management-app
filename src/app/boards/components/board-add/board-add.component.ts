import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent {
  isVisible = true;

  boardAddForm!: FormGroup;

  constructor() {
    this.boardAddForm = new FormGroup({
      title: new FormControl(),
      participants: new FormControl(),
      image: new FormControl(),
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
