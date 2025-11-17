import { ToastState, ToastActionTypes, SHOW_TOAST, CLEAR_TOAST } from "./types";

const initialState: ToastState = {
  message: null,
  type: "info",
};

export default function toastReducer(state = initialState, action: ToastActionTypes): ToastState {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type || "info",
      };
    case CLEAR_TOAST:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
}
