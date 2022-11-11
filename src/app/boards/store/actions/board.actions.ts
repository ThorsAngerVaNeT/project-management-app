import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Board, BoardParams } from '../../models/board.model';
import { User } from '../../../users/models/user.model';

export const loadBoards = createAction('[Boards] Load Boards');
export const loadBoardsSuccess = createAction('[Boards] Load Boards Success', props<{ boards: Board[] }>());
export const loadBoardsFailure = createAction('[Boards] Load Boards Failure', props<{ error: unknown }>());

export const loadBoard = createAction('[Boards] Load Board', props<{ id: string }>());
export const loadBoardSuccess = createAction('[Boards] Load Board Success', props<{ board: Board }>());
export const loadBoardFailure = createAction('[Boards] Load Board Failure', props<{ error: unknown }>());

export const loadBoardsSet = createAction('[Boards] Load BoardsSet', props<{ ids: Board['_id'][] }>());
export const loadBoardsSetSuccess = createAction('[Boards] Load BoardsSet Success', props<{ boards: Board[] }>());
export const loadBoardsSetFailure = createAction('[Boards] Load BoardsSet Failure', props<{ error: unknown }>());

export const loadBoardsByUser = createAction('[Boards] Load BoardsByUser', props<{ userId: User['_id'] }>());
export const loadBoardsByUserSuccess = createAction('[Boards] Load BoardsByUser Success', props<{ boards: Board[] }>());
export const loadBoardsByUserFailure = createAction('[Boards] Load BoardsByUser Failure', props<{ error: unknown }>());

export const createBoard = createAction('[Boards] Create Board', props<{ board: BoardParams }>());
export const createBoardSuccess = createAction('[Boards] Create Board Success', props<{ board: Board }>());
export const createBoardFailure = createAction('[Boards] Create Board Failure', props<{ error: unknown }>());

export const updateBoard = createAction('[Boards] Update Board', props<{ id: string; board: BoardParams }>());
export const updateBoardSuccess = createAction('[Boards] Update Board Success', props<{ board: Update<Board> }>());
export const updateBoardFailure = createAction('[Boards] Update Board Failure', props<{ error: unknown }>());

export const deleteBoard = createAction('[Boards] Delete Board', props<{ id: string }>());
export const deleteBoardSuccess = createAction('[Boards] Delete Board Success', props<{ id: string }>());
export const deleteBoardFailure = createAction('[Boards] Delete Board Failure', props<{ error: unknown }>());
