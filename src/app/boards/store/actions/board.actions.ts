import { createAction, props } from '@ngrx/store';
import { EntityState, Update } from '@ngrx/entity';
import { Board, BoardParamsWithImage } from '../../model/board.model';
// import { User } from '@users/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';

export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction('[Boards] Load Boards Success', props<{ boards: Board[] }>());

export const loadBoard = createAction('[Boards] Load Board', props<{ id: Board['_id'] }>());
export const loadBoardSuccess = createAction('[Boards] Load Board Success', props<{ board: Board }>());

// export const loadBoardsSet = createAction('[Boards] Load BoardsSet', props<{ ids: Board['_id'][] }>());
// export const loadBoardsSetSuccess = createAction('[Boards] Load BoardsSet Success', props<{ boards: Board[] }>());

// export const loadBoardsByUser = createAction('[Boards] Load BoardsByUser', props<{ userId: User['_id'] }>());
// export const loadBoardsByUserSuccess = createAction('[Boards] Load BoardsByUser Success', props<{ boards: Board[] }>());

export const createBoard = createAction('[Boards] Create Board', props<{ board: BoardParamsWithImage }>());
export const createBoardSuccess = createAction('[Boards] Create Board Success', props<{ board: Board; file: File }>());

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ boardId: Board['_id']; board: BoardParamsWithImage }>(),
);
export const updateBoardSuccess = createAction(
  '[Boards] Update Board Success',
  props<{ board: Update<Board>; file: File }>(),
);

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
