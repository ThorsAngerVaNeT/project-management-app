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

  on(BoardActions.loadBoardsSuccess, (state, action) => adapter.setAll(action.boards, state)),
  on(BoardActions.loadBoardSuccess, (state, action) => adapter.setOne(action.board, state)),
  on(BoardActions.loadBoardsSetSuccess, (state, action) => adapter.setMany(action.boards, state)),
  on(BoardActions.loadBoardsByUserSuccess, (state, action) => adapter.setMany(action.boards, state)),
  on(BoardActions.createBoardSuccess, (state, action) => adapter.addOne(action.board, state)),
  on(BoardActions.updateBoardSuccess, (state, action) => adapter.updateOne(action.board, state)),
  on(BoardActions.deleteBoardSuccess, (state, action) => adapter.removeOne(action.id, state)),
);

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors();
