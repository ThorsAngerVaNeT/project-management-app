import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UsersModule {}
