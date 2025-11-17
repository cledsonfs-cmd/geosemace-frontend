export const SHOW_TOAST = "SHOW_TOAST";
export const CLEAR_TOAST = "CLEAR_TOAST";

export interface ToastState {
  message: string | null;
  type: "success" | "error" | "info" | "warning";
}

interface ShowToastAction {
  type: typeof SHOW_TOAST;
  payload: { message: string; type?: ToastState["type"] };
}

interface ClearToastAction {
  type: typeof CLEAR_TOAST;
}

export type ToastActionTypes = ShowToastAction | ClearToastAction;
