export const AUTH_START = 'AUTH_START'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_USER = 'AUTH_USER'

// Define the types of the actions
export type AuthAction =
  | { type: typeof AUTH_START }
  | { type: typeof AUTH_LOGIN; payload: any }
  | { type: typeof AUTH_SUCCESS }
  | { type: typeof AUTH_FAIL; payload: any }
  | { type: typeof AUTH_LOGOUT }
  | { type: typeof AUTH_USER; payload: any };
