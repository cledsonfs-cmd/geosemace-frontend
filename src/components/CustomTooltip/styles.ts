import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const tooltipWrapper: SxProps<Theme> = {
  backgroundColor: "transparent",
  boxShadow: "none",
  p: 0,
};

export const tooltipCard: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1,
  backgroundColor: "#f9fafb",
  color: "#1e293b",
  border: "1px solid #e2e8f0",
  borderRadius: 2,
  p: 1.5,
  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  maxWidth: 280,
};

export const tooltipIcon: SxProps<Theme> = {
  fontSize: 28,
  color: "#006837",
  flexShrink: 0,
};
