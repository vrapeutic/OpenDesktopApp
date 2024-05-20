export const  EXPRESS_PORT =  3001

export const  SOCKET_ALLOWED_EVENTS = {
  MESSAGE: "message",
  START_APP: "start-app",
  START_SESSION: "start-session",
  PLAY_MODULE: "play-module",
}

export const SERVER_LOGS_COLOR = "\x1b[36m%s\x1b[0m"

export const START_APP_MESSAGE = "PLAY_MODULE" // this has to match a key in SOCKET_ALLOWED_EVENTS

export const MODULE_PACKAGE_KEY = 'modulePackageName'
