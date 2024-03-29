// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  RETRY_HTTP_COUNT: 0,
  API_URL: 'https://ngpma-be.onrender.com/',
  BOARD_COVER_FILE_TASK_ID: 'board-cover',
  BOARD_COVER_DEFAULT_IMAGE_URL: './assets/images/board-cover.png',
  SEARCH_DEBOUNCE_TIME: 500,
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  DEFAULT_HTTP_TIMEOUT: 10000,
  JWT_PATTERN: /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
