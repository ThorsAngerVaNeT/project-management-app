import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer, routerReducer } from '@ngrx/router-store';

import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface StoreRootState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}
export const reducers: ActionReducerMap<StoreRootState> = {
  router: routerReducer,
};

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
