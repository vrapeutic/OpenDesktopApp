export const EXPRESS_PORT = 3001;

export const RECEIVED_MESSAGES = {
  generateSessionReport: 'generateSessionReport',
  moduleNotFound: 'moduleNotFound',
};

export const SOCKET_ALLOWED_EVENTS = {
  playModule: 'playModule',
  endSession: 'endSession',
  ...RECEIVED_MESSAGES,
};

export const SERVER_LOGS_COLOR = '\x1b[36m%s\x1b[0m';
export const YELLOW_SERVER_LOGS_COLOR = '\x1b[33m%s\x1b[0m';

export const START_APP_MESSAGE = 'playModule'; // this has to match a key in SOCKET_ALLOWED_EVENTS
export const END_SESSION_MESSAGE = 'endSession';
export const MODULE_NOT_FOUND_ERROR_MESSAGE = 'moduleNotFound';
export const GENERATE_SESSION_REPORT = 'generateSessionReport';

export const MODULE_PACKAGE_KEY = 'modulePackageName';

export const REPORT_FILE_SAVE_PATH = 'Desktop/VRapeuticSessions';

export const DESKTOP_APP_SERVICE_NAME = 'electron-service';
