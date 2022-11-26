import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent implements OnInit {
  language = environment.defaultLocale;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
    this.translateService.addLangs(environment.locales);
  }

  onChange(value: string): void {
    this.translateService.use(value);
  }
}
