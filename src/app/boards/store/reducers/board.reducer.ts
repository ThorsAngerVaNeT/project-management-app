import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Board } from '../../model/board.model';
import * as BoardActions from '../actions/board.actions';

export const boardsFeatureKey = 'boards';

export interface BoardsState extends EntityState<Board> {
  boardsLoading: boolean;
  boardsLoaded: boolean;
  boardLoading: boolean;
  cachedBoards: EntityState<Board>;
}

const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board._id,
});

export const initialState: BoardsState = adapter.getInitialState({
  ids: [],
  entities: {},
  boardsLoading: false,
  boardsLoaded: false,
  boardLoading: false,
  cachedBoards: {
    ids: [],
    entities: {},
  },
});

export const reducer = createReducer(
  initialState,

  on(BoardActions.loadBoards, (state): BoardsState => ({ ...state, boardsLoaded: false })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => adapter.setAll(boards, { ...state, boardsLoaded: true })),
  on(BoardActions.loadBoardSuccess, (state, { board }) => adapter.setOne(board, state)),
  on(BoardActions.createBoard, (state): BoardsState => ({ ...state, boardLoading: true })),
  on(BoardActions.createBoardSuccess, (state, { board }) => adapter.addOne(board, state)),
  on(BoardActions.createBoardSuccess, (state): BoardsState => ({ ...state, boardLoading: false })),
  on(BoardActions.createBoardFailure, (state): BoardsState => ({ ...state, boardLoading: false })),
  on(BoardActions.updateBoard, (state): BoardsState => ({ ...state, boardLoading: true })),
  on(BoardActions.updateBoardSuccess, (state, { board }) =>
    adapter.updateOne(board, { ...state, boardLoading: false }),
  ),
  on(BoardActions.updateBoardFailure, (state): BoardsState => ({ ...state, boardLoading: false })),
  on(BoardActions.deleteBoard, (state, { id }) =>
    adapter.removeOne(id, { ...state, cachedBoards: { ids: state.ids.slice(), entities: { ...state.entities } } }),
  ),
  on(BoardActions.deleteBoardSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(
    BoardActions.deleteBoardFailure,
    (state, { boardsState: { ids, entities } }): BoardsState => ({ ...state, ids, entities, boardLoading: true }),
  ),
  on(BoardActions.loadMainPageData, (state): BoardsState => ({ ...state, boardsLoading: true })),
  on(
    BoardActions.loadMainPageDataSuccess,
    (state): BoardsState => ({ ...state, boardsLoading: false, boardsLoaded: true }),
  ),
  on(
    BoardActions.loadMainPageDataFailure,
    (state): BoardsState => ({ ...state, boardsLoading: false, boardsLoaded: false }),
  ),
  on(BoardActions.preloadImagesCompleted, (state): BoardsState => ({ ...state, boardsLoading: false })),
);

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors();
