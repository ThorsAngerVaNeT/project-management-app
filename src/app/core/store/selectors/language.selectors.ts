import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguageState } from '../reducers/language.reducer';

export const selectLanguageState = createFeatureSelector<LanguageState>('language');

export const selectLocalizationValue = createSelector(selectLanguageState, (state) => state.language);
