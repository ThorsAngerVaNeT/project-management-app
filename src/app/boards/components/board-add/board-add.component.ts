import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { concatLatestFrom } from '@ngrx/effects';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { map, Observable, Subscription } from 'rxjs';
import { User } from '@users/model/user.model';
import { BoardWithUsers } from '../../model/board.model';
import { TaskFile } from '@files/model/file.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent implements OnInit, OnDestroy {
  board!: BoardWithUsers;

  boardAddForm!: FormGroup;

  isLoading$ = this.storeFacade.boardIsLoading$;

  user$ = this.storeFacade.user$;

  users$ = this.storeFacade.users$.pipe(
    concatLatestFrom(() => this.user$),
    map(([users, { _id }]) => users.filter((user) => user._id !== _id)),
  );

  userId: User['_id'] = '';

  file!: File;

  covers$!: Observable<{ [keyof: string]: TaskFile }>;

  boardCoverFile!: TaskFile;

  subscription = new Subscription();

  allowedFileTypes = ['image/png', 'image/jpeg'];

  constructor(
    private storeFacade: StoreFacade,
    private modal: NzModalRef,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.user$.subscribe(({ _id }) => {
        this.userId = _id;
      }),
    );

    this.boardAddForm = new FormGroup({
      title: new FormControl(this.board ? this.board.title : '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      participants: new FormControl(
        [
          this.userId,
          ...(this.board ? this.board.users.map((user) => user._id).filter((id) => id !== this.userId) : []),
        ],
        [Validators.required],
      ),
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
      const file = this.file;

      if (this.board) {
        const {
          _id: boardId,
          owner: { _id: owner },
        } = this.board;

        this.storeFacade.updateBoard(boardId, { owner, title, users, file });
      } else {
        this.storeFacade.createBoard({ owner: this.userId, title, users, file });
      }
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

  onFileInput(files: FileList | null): void {
    if (files) {
      const file = files[0];
      if (!file || this.allowedFileTypes.includes(file.type)) {
        this.file = files[0];
      } else {
        this.modalService.error({
          nzTitle: this.translateService.instant('WrongFileFormatErrorTitle'),
          nzContent: this.translateService.instant('WrongFileFormatErrorContent'),
        });
        this.boardAddForm.get('image')?.reset();
      }
    }
  }
}
