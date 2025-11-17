import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const cardsWrapper: SxProps<Theme> = (theme) => ({
  position: "absolute",
  top: 5,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
  px: 2,
});

export const cardsContainer: SxProps<Theme> = (theme) => ({
  width: "100%",
  maxWidth: 1100,
  pointerEvents: "none",  
  WebkitBackdropFilter: "blur(6px)",
  borderRadius: 16,
  padding: theme.spacing(0.5),
    alignItems: "flex-end",
  textAlign: "right",  
});

export const card: SxProps<Theme> = (theme) => ({
    height: "100px",
  pointerEvents: "auto",
  borderRadius: 5,
  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
      : "linear-gradient(180deg, #fff, #f9fafb)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.06)"
  }`,
  transition: "transform .15s ease, box-shadow .15s ease, border-color .15s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.18)"
        : "rgba(0,0,0,0.12)",
  },
});

export const cardContent: SxProps<Theme> = (theme) => ({
  py: 2.25,
  px: 2.25,
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const icon: SxProps<Theme> = (theme) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: 10,
  background:
    theme.palette.mode === "dark"
      ? "rgba(76, 175, 80, 0.16)" 
      : "rgba(76, 175, 80, 0.12)",
  "& svg": { fontSize: 20, color: theme.palette.success.main },
});

export const label: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary,
  letterSpacing: 0.2,
  fontWeight: 600,    
});

export const value: SxProps<Theme> = (theme) => ({
  fontWeight: 800,
  lineHeight: 1.1,
  color: theme.palette.success.main,
  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },  
});
