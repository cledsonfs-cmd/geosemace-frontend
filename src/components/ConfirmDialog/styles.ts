import { SxProps, Theme } from "@mui/material";

export const dialogContent: SxProps<Theme> = {
  textAlign: "center",
  p: 2,
  borderRadius: 2,
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px) saturate(130%)",
  boxShadow: "inset 0 0 4px rgba(0,0,0,0.1)",
};

export const messageText: SxProps<Theme> = {
  fontSize: "0.95rem",
  color: "text.primary",
};

export const dialogActions: SxProps<Theme> = {
  justifyContent: "center",
  gap: 1.5,
  pb: 2,
};
