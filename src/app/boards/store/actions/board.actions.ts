import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/board.model';

export const loadBoards = createAction('[Boards] Load Boards');

export const loadBoardsSuccess = createAction('[Boards] Load Boards Success', props<{ data: Board[] }>());

export const loadBoardsFailure = createAction('[Boards] Load Boards Failure', props<{ error: unknown }>());
