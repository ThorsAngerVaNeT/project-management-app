import { createAction, props } from '@ngrx/store';

export const initLocalization = createAction('[Language Switcher] Init Localization');
export const changeLanguage = createAction('[Language Switcher] Change Language', props<{ language: 'ru' | 'en' }>());
