import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "./types";

export const authRequest = () => ({
  type: AUTH_REQUEST,
  payload: { },
});

export const loginSuccess = (data: {}) => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const loginFailure = (error: string) => ({
  type: AUTH_FAILURE,
  payload: error,
});
