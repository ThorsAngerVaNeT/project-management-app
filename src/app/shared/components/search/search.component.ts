import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchResult$ = this.storeFacade.searchResult$;

  nzFilterOption = (): boolean => true;

  constructor(private storeFacade: StoreFacade) {}

  search(searchString: string): void {
    this.storeFacade.searchTask(searchString);
  }
}
