export const EXPRESS_PORT = 3001;

export const RECEIVED_MESSAGES = {
  generateSessionReport: 'generateSessionReport',
};

export const SOCKET_ALLOWED_EVENTS = {
  PLAY_MODULE: 'playModule',
  END_SESSION: 'endSession',
  GENERATE_SESSION_REPORT: 'generateSessionReport',
  MODULE_NOT_FOUND: 'moduleNotFound',
  ...RECEIVED_MESSAGES,
};

export const SERVER_LOGS_COLOR = '\x1b[36m%s\x1b[0m';
export const YELLOW_SERVER_LOGS_COLOR = '\x1b[33m%s\x1b[0m';

export const START_APP_MESSAGE = 'PLAY_MODULE'; // this has to match a key in SOCKET_ALLOWED_EVENTS
export const END_SESSION_MESSAGE = 'END_SESSION';
export const MODULE_NOT_FOUND_ERROR_MESSAGE = 'MODULE_NOT_FOUND';

export const MODULE_PACKAGE_KEY = 'modulePackageName';

export const REPORT_FILE_SAVE_PATH = 'Desktop/VRapeuticSessions';
