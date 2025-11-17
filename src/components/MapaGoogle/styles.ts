import { SxProps, Theme } from "@mui/material/styles";

export const container: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  position: "relative",
};

export const texto: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  right: 0,  
  width: "50%",      
  padding: "8px 25px",
  zIndex: 1000,
  textAlign: "right",
  fontWeight: "400",
  fontSize: "0.9rem",  
};


