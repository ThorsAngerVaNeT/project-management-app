import { ChangeDetectionStrategy, Component } from '@angular/core';

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

  developers = [
    {
      name: 'ThorsAngerVaNeT',
      about:
        'Team Lead, organized NGRX Store for the app, developed board and all the related components, introduced routing restrictions, built CI/CD, deployed backend',
      github: 'https://github.com/thorsangervanet',
    },
    {
      name: 'Ogimly',
      about:
        'With fondness created services and interceptors, implemented services error handling, was in charge of search logic and drag&drop support',
      github: 'https://github.com/ogimly',
    },
    {
      name: '022022',
      about:
        'Designed and developed interfaces with NG Zorro library, set up forms validation, implemented login and sign up functionality',
      github: 'https://github.com/022022',
    },
  ];
}
