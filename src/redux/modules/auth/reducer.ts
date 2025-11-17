import { AuthState } from "./interfaces";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from "./types";

const initialState: AuthState = {
  authorization: null,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action: any): AuthState {
  
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return { ...state, loading: false, authorization: action.payload };
    case AUTH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
