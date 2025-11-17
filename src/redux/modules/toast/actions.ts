import { SHOW_TOAST, CLEAR_TOAST, ToastActionTypes } from "./types";

export const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info"): ToastActionTypes => ({
  type: SHOW_TOAST,
  payload: { message, type },
});

export const clearToast = (): ToastActionTypes => ({
  type: CLEAR_TOAST,
});
