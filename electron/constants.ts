export const EXPRESS_PORT = 3001;

export const SOCKET_ALLOWED_EVENTS = {
  PLAY_MODULE: 'playModule',
  END_SESSION: 'endSession',
  GENERATE_SESSION_REPORT: 'generateSessionReport',
};

export const OUTGOING_ONLY_MESSAGES = {
  GENERATE_SESSION_REPORT: 'generateSessionReport',
};

export const SERVER_LOGS_COLOR = '\x1b[36m%s\x1b[0m';
export const YELLOW_SERVER_LOGS_COLOR = '\x1b[33m%s\x1b[0m';

export const START_APP_MESSAGE = 'PLAY_MODULE'; // this has to match a key in SOCKET_ALLOWED_EVENTS

export const END_SESSION_MESSAGE = 'END_SESSION';

export const MODULE_PACKAGE_KEY = 'modulePackageName';

export const GENERATE_SESSION_REPORT = 'GENERATE_SESSION_REPORT';

export const REPORT_FILE_SAVE_PATH = 'Desktop/sessions_reports';
