export const environment = {
  production: true,
  RETRY_HTTP_COUNT: 3,
  API_URL: 'https://ng-final-task-backend-production.up.railway.app/',
  BOARD_COVER_FILE_TASK_ID: 'board-cover',
  BOARD_COVER_DEFAULT_IMAGE_URL: './assets/images/board-cover.png',
  SEARCH_DEBOUNCE_TIME: 500,
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  DEFAULT_HTTP_TIMEOUT: 30000,
  JWT_PATTERN: /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
};
