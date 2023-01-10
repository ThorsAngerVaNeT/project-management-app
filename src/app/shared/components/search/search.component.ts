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

  isLoading$ = this.storeFacade.searchResultIsLoading$;

  nzFilterOption = (): boolean => true;

  searchType: string = SearchTypes.byKeyWords;

  searchText = '';

  visible = false;

  constructor(private storeFacade: StoreFacade) {}

  public getUsersList(task: ColumnTaskWithUsers): string {
    return task.users.map((user) => user.name).join(', ');
  }

  public search(searchString: string): void {
    if (searchString) {
      this.visible = true;
      this.storeFacade.searchTask(searchString, this.searchType);
    } else {
      this.storeFacade.clearSearchTask();
    }
  }

  public clearSearch(): void {
    this.searchText = '';
    this.storeFacade.clearSearchTask();
  }

  changeVisible(value: boolean): void {
    this.visible = value;
  }
}
