import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const root = (open: boolean): SxProps<Theme> => ({
  height: "100%",
  width: open ? 200 : 60,
  bgcolor: "#006837",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: open ? "flex-start" : "center",
  p: 1,
  transition: "width 0.3s",
  flexShrink: 0,
});

export const toggleBtn: SxProps<Theme> = {
  color: "white",
  mb: 2,
};

export const navBtn = (open: boolean): SxProps<Theme> => ({
  color: "white",
  justifyContent: open ? "flex-start" : "center",
  width: "100%",
  textTransform: "none",
  mb: 1,
  display: "flex",
  gap: open ? 1 : 0,
});
