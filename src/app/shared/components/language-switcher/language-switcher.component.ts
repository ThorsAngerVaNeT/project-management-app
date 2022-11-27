import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  language!: 'ru' | 'en';

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

  onChange(value: 'ru' | 'en'): void {
    this.storeFacade.changeLanguage(value);
  }
}
