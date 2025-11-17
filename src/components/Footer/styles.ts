import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const footerRoot: SxProps<Theme> = {
  backgroundColor: "#004d26",
  color: "white",
  py: 1.5,
  mt: "auto",
  textAlign: "center",
};

export const footerRow: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 3,
  flexWrap: "wrap",
};


export const copyright: SxProps<Theme> = {
  mt: 0,
};
