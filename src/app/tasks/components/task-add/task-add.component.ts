import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Board } from '@boards/model/board.model';
import { Column } from '@columns/model/column.model';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTaskParams, ColumnTaskUpdateParams, ColumnTaskWithUsers } from '../../model/task.model';
import { EMPTY_POINT, Point } from '@points/model/point.model';
import { User } from '@users/model/user.model';
import { Dictionary } from '@ngrx/entity';
import { EMPTY_USER } from '@users/store/reducers/user.reducer';
import { TranslateService } from '@ngx-translate/core';
import { spaceValidator } from '@shared/validators/space.validator';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddComponent implements OnInit, OnDestroy {
  @Input() task!: ColumnTaskWithUsers;

  isVisible = true;

  boardId!: Board['_id'];

  columnId!: Column['_id'];

  order!: number;

  taskAddForm!: FormGroup;

  userEntities$ = this.storeFacade.userEntities$.pipe(
    switchMap((usersEntities) => {
      return this.storeFacade.boardEntities$.pipe(
        map((boards) => {
          const board = boards[this.boardId ?? this.task.boardId];
          if (board && board.users) {
            const users = Object.entries(usersEntities).filter(
              ([, user]) => user && user._id && this.isBoardUser(board, user._id),
            );
            return Object.fromEntries(users);
          }

          return usersEntities;
        }),
      );
    }),
  );

  userEntities!: Dictionary<User>;

  subscription = new Subscription();

  pointsLoading$ = this.storeFacade.pointsLoading$;

  points$!: Observable<Point[]>;

  responsibleToParticipants = { _id: '', name: '' };

  taskIsLoading$ = this.storeFacade.taskIsLoading$;

  constructor(
    private storeFacade: StoreFacade,
    private modal: NzModalRef,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userEntities$.subscribe((userEntities) => {
        this.userEntities = userEntities;
      }),
    );

    this.taskAddForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(40), spaceValidator()]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(255), spaceValidator()]),
      responsible: new FormControl(null, [Validators.required]),
      participants: new FormControl([], [Validators.required]),
    });

    if (this.task) {
      const { title, description, userId: responsibleId, users } = this.task;
      const participants = users.map((user) => user._id);

      if (responsibleId) {
        this.setResponsibleToParticipants(responsibleId);
      }

      this.points$ = this.storeFacade.points$;

      this.storeFacade.getPointsByTask(this.task._id);

      this.taskAddForm.setValue({ title, description, responsible: responsibleId, participants });
    } else {
      this.points$ = this.storeFacade.newTaskPoints$;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isBoardUser(board: Board, userId: User['_id']): boolean {
    if (this.task) {
      const taskUsers = this.task.users.map((user) => user._id);
      return (
        board.users.includes(userId) ||
        board.owner === userId ||
        this.task.userId === userId ||
        taskUsers.includes(userId)
      );
    }
    return board.users.includes(userId) || board.owner === userId;
  }

  get title(): AbstractControl | null {
    return this.taskAddForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.taskAddForm.get('description');
  }

  get responsible(): AbstractControl | null {
    return this.taskAddForm.get('responsible');
  }

  get participants(): AbstractControl | null {
    return this.taskAddForm.get('participants');
  }

  get point(): Point {
    return { ...EMPTY_POINT, taskId: this.task?._id ?? '', boardId: this.boardId ?? this.task.boardId };
  }

  get users(): User[] {
    return Object.values(this.userEntities).map((user) => user ?? EMPTY_USER);
  }

  get taskId(): string {
    return this.task ? `id: ${this.task._id}` : '';
  }

  get formTitle(): string {
    return this.task
      ? this.translateService.instant('EditTaskModalTitle')
      : this.translateService.instant('CreateTaskModalTitle');
  }

  get isCreateTask(): boolean {
    return !this.task;
  }

  handleOk(): void {
    if (this.taskAddForm.valid) {
      const { title, description, responsible: userId, participants: users } = this.taskAddForm.value;

      if (this.task) {
        const { _id: taskId, boardId, columnId, order } = this.task;
        const taskParams: ColumnTaskUpdateParams = {
          title,
          description,
          userId,
          users,
          order,
          columnId,
        };

        this.storeFacade.updateTask(boardId, columnId, taskId, taskParams);
      } else {
        const taskParams: ColumnTaskParams = { title, description, userId, users, order: this.order };

        this.storeFacade.createTask(this.boardId, this.columnId, taskParams);
      }
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
    this.storeFacade.clearNewTaskPoint();
    this.modal.destroy();
  }

  addResponsibleToParticipants(responsibleId: string): void {
    if (!responsibleId) return;
    this.setResponsibleToParticipants(responsibleId);

    const { participants } = this.taskAddForm.value;
    this.taskAddForm.patchValue({ participants: [...new Set([responsibleId, ...participants])] });
  }

  setResponsibleToParticipants(responsibleId: string): void {
    const responsibleUser = this.userEntities[responsibleId];

    if (responsibleUser) {
      const name = responsibleUser.name ?? '';
      this.responsibleToParticipants = { _id: responsibleId, name };
    }
  }
}
