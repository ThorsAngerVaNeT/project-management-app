import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent implements OnInit {
  isVisible = false;

  boardAddForm!: FormGroup;

  users$ = this.storeFacade.users$;

  constructor(private storeFacade: StoreFacade) {}

  showModal(): void {
    this.isVisible = true;
  }

  ngOnInit(): void {
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
