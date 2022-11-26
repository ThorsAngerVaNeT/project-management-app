import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.getUsers();
  }

  technologies = [
    {
      name: 'Angular',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZB5SrZsa18VII7DoPQ34x_vsYFeCgW1PzTA&usqp=CAU',
    },
    {
      name: 'TypeScript',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/800px-Typescript_logo_2020.svg.png',
    },
    {
      name: 'NG Zorro (AntD)',
      logo: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
    },
    {
      name: 'NGRX',
      logo: 'https://ngrx.io/assets/images/badge.svg',
    },
  ];

  developers = [
    {
      name: 'Thorsangervanet',
      about:
        'Team Lead, organized NGRX Store for the app, developed board and all the related components, introduced routing restrictions, built CI/CD',
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
