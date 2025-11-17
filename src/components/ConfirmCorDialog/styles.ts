import { SxProps, Theme } from "@mui/material";

export const colorPickerContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const colorInput: SxProps<Theme> = {
  width: 80,
  height: 40,
  border: "none",
  cursor: "pointer",
  background: "transparent",
  borderRadius: 1.5,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
};
