import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/board.actions';

export const boardsFeatureKey = 'boards';

export interface BoardsState {}

export const initialState: BoardsState = {};

export const reducer = createReducer(
  initialState,

  on(BoardActions.loadBoards, (state: BoardsState): BoardsState => state),
  on(BoardActions.loadBoardsSuccess, (state: BoardsState, action): BoardsState => ({ ...state, ...action.data })),
);
