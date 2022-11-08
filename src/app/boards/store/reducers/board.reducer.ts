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
  on(
    BoardActions.loadBoardsSuccess,
    (state: BoardsState, action): BoardsState => adapter.addMany(action.boards, state),
  ),

  on(BoardActions.loadBoardSuccess, (state: BoardsState, action): BoardsState => adapter.setOne(action.board, state)),

  on(
    BoardActions.loadBoardsSetSuccess,
    (state: BoardsState, action): BoardsState => adapter.setMany(action.boards, state),
  ),

  on(
    BoardActions.loadBoardsByUserSuccess,
    (state: BoardsState, action): BoardsState => adapter.setMany(action.boards, state),
  ),

  on(BoardActions.createBoardSuccess, (state: BoardsState, action): BoardsState => adapter.addOne(action.board, state)),

  on(
    BoardActions.updateBoardSuccess,
    (state: BoardsState, action): BoardsState => adapter.updateOne(action.board, state),
  ),

  on(BoardActions.deleteBoardSuccess, (state: BoardsState, action): BoardsState => adapter.removeOne(action.id, state)),
);

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors();
