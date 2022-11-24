import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Board } from '../../model/board.model';
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

  on(BoardActions.loadBoardsSuccess, (state, { boards }) => adapter.setAll(boards, state)),
  on(BoardActions.loadBoardSuccess, (state, { board }) => adapter.setOne(board, state)),
  // on(BoardActions.loadBoardsSetSuccess, (state, { boards }) => adapter.setMany(boards, state)),
  // on(BoardActions.loadBoardsByUserSuccess, (state, { boards }) => adapter.setMany(boards, state)),
  on(BoardActions.createBoardSuccess, (state, { board }) => adapter.addOne(board, state)),
  on(BoardActions.updateBoardSuccess, (state, { board }) => adapter.updateOne(board, state)),
  on(BoardActions.deleteBoardSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors();
