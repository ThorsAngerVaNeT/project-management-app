import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SortByOrderPipe } from './pipes/sort-by-order/sort-by-order.pipe';
import { SearchComponent } from './components/search/search.component';
import { SearchResultEffects } from '@tasks/store/effects/search-result.effects';
import * as fromSearchResult from '@tasks/store/reducers/search-result.reducer';

const MODULES = [
  NzLayoutModule,
  NzInputModule,
  NzRadioModule,
  NzDropDownModule,
  NzIconModule,
  NzButtonModule,
  NzToolTipModule,
  NzFormModule,
  NzListModule,
  NzBadgeModule,
  NzPageHeaderModule,
  NzAvatarModule,
  NzTagModule,
  NzSelectModule,
  NzUploadModule,
  NzDividerModule,
  NzCheckboxModule,
  NzCardModule,
  NzModalModule,

  CommonModule,
  ReactiveFormsModule,
  DragDropModule,
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConfirmationComponent, SortByOrderPipe, SearchComponent],
  imports: [
    ...MODULES,
    EffectsModule.forFeature([SearchResultEffects]),
    StoreModule.forFeature(fromSearchResult.tasksFeatureKey, fromSearchResult.reducer),
  ],
  exports: [...MODULES, FooterComponent, HeaderComponent, SearchComponent, SortByOrderPipe],
})
export class SharedModule {}
