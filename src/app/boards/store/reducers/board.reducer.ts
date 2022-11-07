import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Board } from '../../models/board.model';
import * as BoardActions from '../actions/board.actions';

export const boardsFeatureKey = 'boards';

export interface BoardsState extends EntityState<Board> {}

const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board._id,
});

export const initialState: BoardsState = adapter.getInitialState({
  ids: [],
  entities: {},
});

export const reducer = createReducer(
  initialState,

  on(BoardActions.loadBoards, (state: BoardsState): BoardsState => adapter.removeAll(state)),
  on(BoardActions.loadBoardsSuccess, (state: BoardsState, action): BoardsState => adapter.addMany(action.data, state)),
);

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors();
