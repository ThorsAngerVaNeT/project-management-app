import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, concatLatestFrom, ofType } from '@ngrx/effects';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map, Subscription } from 'rxjs';
import { User } from '@users/model/user.model';
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

  user$ = this.storeFacade.user$;

  users$ = this.storeFacade.users$.pipe(
    concatLatestFrom(() => this.user$),
    map(([users, { _id }]) => users.filter((user) => user._id !== _id)),
  );

  userId: User['_id'] = '';

  subscription = new Subscription();

  constructor(private storeFacade: StoreFacade, private action$: Actions, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.subscription.add(
      this.user$.subscribe(({ _id }) => {
        this.userId = _id;
      }),
    );

    this.subscription.add(
      this.action$.pipe(ofType(createBoardSuccess)).subscribe(() => {
        this.handleCancel();
      }),
    );

    this.boardAddForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      participants: new FormControl([this.userId], [Validators.required]),
      image: new FormControl(),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get title(): AbstractControl | null {
    return this.boardAddForm.get('title');
  }

  handleOk(): void {
    if (this.boardAddForm.valid) {
      const { title, participants: users } = this.boardAddForm.value;

      this.isLoading = true;
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
