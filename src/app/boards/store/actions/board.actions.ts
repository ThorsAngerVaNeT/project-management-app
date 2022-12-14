import { createAction, props } from '@ngrx/store';
import { EntityState, Update } from '@ngrx/entity';
import { Board, BoardParamsWithImage } from '../../model/board.model';
import { HttpErrorResponse } from '@angular/common/http';

export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction('[Boards] Load Boards Success', props<{ boards: Board[] }>());

export const loadBoard = createAction('[Boards] Load Board', props<{ id: Board['_id'] }>());
export const loadBoardSuccess = createAction('[Boards] Load Board Success', props<{ board: Board }>());

export const createBoard = createAction('[Boards] Create Board', props<{ board: BoardParamsWithImage }>());
export const createBoardSuccess = createAction('[Boards] Create Board Success', props<{ board: Board; file: File }>());
export const createBoardFailure = createAction('[Boards] Create Board Failure', props<{ error: unknown }>());

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ boardId: Board['_id']; board: BoardParamsWithImage }>(),
);
export const updateBoardSuccess = createAction(
  '[Boards] Update Board Success',
  props<{ board: Update<Board>; file: File }>(),
);
export const updateBoardFailure = createAction('[Boards] Update Board Failure', props<{ error: unknown }>());

export const deleteBoard = createAction('[Boards] Delete Board', props<{ id: Board['_id'] }>());
export const deleteBoardSuccess = createAction('[Boards] Delete Board Success', props<{ id: Board['_id'] }>());
export const deleteBoardFailure = createAction(
  '[Boards] Delete Board Failure',
  props<{ error: HttpErrorResponse; boardsState: EntityState<Board> }>(),
);

export const loadMainPageData = createAction('[Boards] Load Main Page Data');
export const loadMainPageDataSuccess = createAction('[Boards] Load Main Page Data Success');
export const loadMainPageDataFailure = createAction(
  '[Boards] Load Main Page Data Failure',
  props<{ error: unknown }>(),
);

export const preloadImagesCompleted = createAction('[Boards] Preload Images Completed');
