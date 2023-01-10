import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as LanguageActions from '../actions/language.actions';

export type Locales = 'ru' | 'en';

export interface LanguageState {
  language: Locales;
}

export const initialState: LanguageState = {
  language: 'en',
};

export const languageReducer = createReducer(
  initialState,
  on(LanguageActions.changeLanguage, (state, { language }): LanguageState => ({ ...state, language })),
);

export const localStorageSyncReducer = (reducer: ActionReducer<Action>): ActionReducer<Action> => {
  return localStorageSync({ keys: ['language'], rehydrate: true })(reducer);
};

export const languageMetaReducers: MetaReducer[] = [localStorageSyncReducer];
