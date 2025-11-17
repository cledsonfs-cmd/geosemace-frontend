import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const appBar: SxProps<Theme> = {
  backgroundColor: "#006837",
};

export const toolbar: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
};

export const brand: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

export const logo: SxProps<Theme> = {
  height: 50,
  display: "block",
};

export const title: SxProps<Theme> = {
  fontWeight: "bold",
  lineHeight: 1,
};

export const actions: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const drawerContent: SxProps<Theme> = {
  width: 250,
  p: 2,
};

export const drawerButton: SxProps<Theme> = {
  justifyContent: "flex-start",
};
