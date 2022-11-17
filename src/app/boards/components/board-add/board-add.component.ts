import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, ofType } from '@ngrx/effects';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { createBoardSuccess } from '../../store/actions/board.actions';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent implements OnInit, OnDestroy {
  boardAddForm!: FormGroup;

  isLoading = false;

  users$ = this.storeFacade.users$;

  subscription = new Subscription();

  constructor(private storeFacade: StoreFacade, private action$: Actions, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.boardAddForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      participants: new FormControl(),
      image: new FormControl(),
    });

    this.subscription.add(
      this.action$.pipe(ofType(createBoardSuccess)).subscribe(() => {
        this.handleCancel();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get title(): AbstractControl | null {
    return this.boardAddForm.get('title');
  }

  handleOk(): void {
    if (this.boardAddForm.valid) {
      this.isLoading = true;
      const { title, participants: users } = this.boardAddForm.value;
      this.storeFacade.createBoard({ title, users });
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
    this.modal.destroy();
  }
}
