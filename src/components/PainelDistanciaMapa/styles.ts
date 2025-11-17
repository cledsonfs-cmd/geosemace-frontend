import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const painel: SxProps<Theme> = {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 2,
    p: 1.5,
    boxShadow: 3,
    fontWeight: 500,
    minWidth: 140,
    textAlign: "center",
};