import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const root: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

export const content: SxProps<Theme> = {
  display: "flex",
  flex: 1,
  minHeight: 0,  
};

export const main: SxProps<Theme> = {
  flex: 1,
  p: 2,
  overflowY: "auto",
  padding: 0,
};
