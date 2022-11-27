import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Subscription } from 'rxjs';
import { Locales } from '../../../core/store/reducers/language.reducer';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  language!: Locales;

  localizationValue$ = this.storeFacade.localizationValue$;

  subscription = new Subscription();

  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.initLocalization();

    this.subscription.add(
      this.localizationValue$.subscribe((language) => {
        this.language = language;
      }),
    );

    this.onChange(this.language);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(value: Locales): void {
    this.storeFacade.changeLanguage(value);
  }
}
