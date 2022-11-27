import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as LanguageActions from '../actions/language.actions';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LanguageEffects {
  constructor(private actions$: Actions, private translateService: TranslateService) {}

  initLocalization$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LanguageActions.initLocalization),
        map(() => {
          this.translateService.use(environment.defaultLocale);
          this.translateService.addLangs(environment.locales);
        }),
      );
    },
    { dispatch: false },
  );

  changeLanguage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LanguageActions.changeLanguage),
        switchMap(({ language }) => this.translateService.use(language)),
      );
    },
    { dispatch: false },
  );
}
