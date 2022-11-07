import { createFeatureSelector } from '@ngrx/store';
import * as fromBoard from '../reducers/board.reducer';

export const selectBoardsState = createFeatureSelector<fromBoard.BoardsState>(fromBoard.boardsFeatureKey);
