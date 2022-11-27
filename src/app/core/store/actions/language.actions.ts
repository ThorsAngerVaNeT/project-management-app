import { createAction, props } from '@ngrx/store';
import { Locales } from '../reducers/language.reducer';

export const initLocalization = createAction('[Language Switcher] Init Localization');
export const changeLanguage = createAction('[Language Switcher] Change Language', props<{ language: Locales }>());
