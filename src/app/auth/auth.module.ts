import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import AuthRoutingModule from './auth.route.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './store/effects/auth.effects';
import { userReducer, userMetaReducers } from './store/reducers/auth.reducer';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('user', userReducer, { metaReducers: userMetaReducers }),
    EffectsModule.forFeature([UserEffects]),
    UsersModule,
  ],
})
export class AuthModule {}
