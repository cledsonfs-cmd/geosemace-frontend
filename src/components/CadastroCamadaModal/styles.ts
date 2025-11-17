import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const dialogTitle: SxProps<Theme> = {
  fontWeight: 600,
  color: "#006837",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  pr: 4,
};

export const closeButton: SxProps<Theme> = {
  position: "absolute",
  right: 16,
  top: 16,
  color: "#006837",
};

export const dialogContent: SxProps<Theme> = {
  backgroundColor: "#f9fafb",
  p: 3,
};

export const container: SxProps<Theme> = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  padding: "24px",
  width: "100%",
};

export const field: SxProps<Theme> = {
  marginBottom: "16px",
};

export const uploadSection: SxProps<Theme> = {
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

export const uploadButton: SxProps<Theme> = {
  borderColor: "#006837",
  color: "#006837",
  "&:hover": {
    backgroundColor: "#e3f2fd",
  },
};

export const fileName: SxProps<Theme> = {
  marginTop: "8px",
  color: "#555",
};

export const dialogActions: SxProps<Theme> = {
  justifyContent: "space-between",
  px: 3,
  pb: 2,
};

export const btnSalvar: SxProps<Theme> = {
  backgroundColor: "#006837",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#e3f2fd",
    color: "#006837",
  },
};

export const btnCancelar: SxProps<Theme> = {
  backgroundColor: "#fff",
  color: "#006837",
  "&:hover": {
    backgroundColor: "#e3f2fd",
    color: "#006837",
  },
};