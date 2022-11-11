import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBoard from '../reducers/board.reducer';
import { selectUsersEntities } from '../../../users/store/selectors/user.selectors';

export const selectBoardsState = createFeatureSelector<fromBoard.BoardsState>(fromBoard.boardsFeatureKey);

export const selectAllBoards = createSelector(selectBoardsState, fromBoard.selectAllBoards);

export const selectBoardsWithUsers = createSelector(selectAllBoards, selectUsersEntities, (boards, allUsers) => {
  return boards.map((board) => {
    const { owner, users: boardUsers } = board;
    const ownerName = allUsers[owner]?.name;
    const users = boardUsers.map((userId: string) => allUsers[userId] ?? userId);
    return {
      ...board,
      ownerName,
      users,
    };
  });
});
