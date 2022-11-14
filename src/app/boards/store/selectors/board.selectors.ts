import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import * as fromBoard from '../reducers/board.reducer';
import { selectUsersEntities } from '@users/store/selectors/user.selectors';
import { User } from '@users/models/user.model';
import { Board, BoardWithUsers } from '@boards/models/board.model';
import { selectRouter } from '@core/store/selectors/router.selector';

export const selectBoardsState = createFeatureSelector<fromBoard.BoardsState>(fromBoard.boardsFeatureKey);

export const selectAllBoards = createSelector(selectBoardsState, fromBoard.selectAllBoards);

export const selectBoardEntities = createSelector(selectBoardsState, fromBoard.selectBoardEntities);

const populateBoardByUserData = (board: Board, userEntities: Dictionary<User>): BoardWithUsers => {
  const { owner: ownerId, users: boardUsers } = board;
  const owner = userEntities[ownerId]!;
  const users = boardUsers.map((userId: string) => userEntities[userId]!);
  return {
    ...board,
    owner,
    users,
  };
};

export const selectBoardsWithUsers = createSelector(selectAllBoards, selectUsersEntities, (boards, userEntities) => {
  return boards.map((board) => populateBoardByUserData(board, userEntities));
});

export const selectCurrentBoard = createSelector(
  selectBoardEntities,
  selectUsersEntities,
  selectRouter,
  (boards, userEntities, router) => {
    const { boardId } = router.state.params;
    const board = boards[boardId];
    if (board) return populateBoardByUserData(board, userEntities);
    return null;
  },
);
