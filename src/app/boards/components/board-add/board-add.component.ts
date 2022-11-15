import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { createBoardSuccess } from '../../store/actions/board.actions';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent implements OnInit, OnDestroy {
  isVisible = false;

  boardAddForm!: FormGroup;

  users$ = this.storeFacade.users$;

  subscription = new Subscription();

  constructor(private storeFacade: StoreFacade, private action$: Actions) {}

  showModal(): void {
    this.isVisible = true;
  }

  ngOnInit(): void {
    this.boardAddForm = new FormGroup({
      title: new FormControl(),
      participants: new FormControl(),
      image: new FormControl(),
    });

    this.subscription.add(
      this.action$.pipe(ofType(createBoardSuccess)).subscribe(() => {
        this.isVisible = false;
        this.boardAddForm.reset();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleOk(): void {
    const { title, participants: users } = this.boardAddForm.value;
    this.storeFacade.createBoard({ title, users });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
