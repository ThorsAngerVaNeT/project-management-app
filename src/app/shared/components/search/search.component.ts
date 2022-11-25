import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTaskWithUsers } from '@tasks/model/task.model';
import { SearchTypes } from '@core/enums/search-types.enums';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchResult$ = this.storeFacade.searchResult$;

  nzFilterOption = (): boolean => true;

  searchType: string = SearchTypes.byKeyWords;

  constructor(private storeFacade: StoreFacade) {}

  public getUsersList(task: ColumnTaskWithUsers): string {
    return task.users.map((user) => user.name).join(', ');
  }

  public search(searchString: string): void {
    this.storeFacade.searchTask(searchString, this.searchType);
  }
}