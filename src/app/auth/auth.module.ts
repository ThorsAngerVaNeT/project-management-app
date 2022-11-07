import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './store/effects/user.effects';
import { userReducer, userMetaReducers } from './store/reducers/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', userReducer, { metaReducers: userMetaReducers }),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class AuthModule {}
