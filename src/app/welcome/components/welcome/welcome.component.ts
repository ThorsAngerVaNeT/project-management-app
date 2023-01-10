import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  technologies = [
    {
      name: 'Angular',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZB5SrZsa18VII7DoPQ34x_vsYFeCgW1PzTA&usqp=CAU',
      link: 'https://angular.io/',
    },
    {
      name: 'NgRx',
      logo: 'https://ngrx.io/assets/images/badge.svg',
      link: 'https://ngrx.io/',
    },
    {
      name: 'TypeScript',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/800px-Typescript_logo_2020.svg.png',
      link: 'https://www.typescriptlang.org/',
    },
    {
      name: 'NG Zorro (AntD)',
      logo: 'https://ng.ant.design/assets/img/logo.svg',
      link: 'https://ng.ant.design/docs/introduce/en',
    },

    {
      name: 'RxJS',
      logo: 'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png',
      link: 'https://rxjs.dev',
    },
  ];

  constructor(private translateService: TranslateService) {}
}
