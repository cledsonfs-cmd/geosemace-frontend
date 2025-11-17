import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

/** Painel principal (compacto) */
export const toolbar: SxProps<Theme> = {
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: "rgba(33, 33, 33, 0.85)",
  display: "flex",
  flexDirection: "column",
  borderRadius: 1,
  boxShadow: 2,
  p: 0.6,
  zIndex: 10,
  width: "auto",
  maxWidth: 400, // levemente menor
};

/** Linha de ícones */
export const iconRow: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.25,
  flexWrap: "wrap",
  color: "#fff",
  "& .MuiIconButton-root": {
    padding: "2px",
    "& svg": {
      fontSize: "1rem",
    },
  },
};

/** Divisor entre grupos de ícones */
export const separator: SxProps<Theme> = {
  width: "1px",
  height: 18,
  backgroundColor: "rgba(255,255,255,0.2)",
  mx: 0.4,
};

/** Linha de busca */
export const searchRow: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 0.8,
  p: "1px 1.5px",
  width: "100%",
  backgroundColor: "#fff",
  mt: 0.4,
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.75rem",
    py: 0.3,
  },
};

/** 🔹 Container geral dos cards */
export const cardsContainer: SxProps<Theme> = {
  position: "absolute",
  top: 60,
  left: 10,
  display: "flex",
  flexDirection: "column",
  gap: 0.6,
  zIndex: 9,
};

/** 🔹 Card base — harmônico e compacto */
export const cardBase: SxProps<Theme> = {
  backgroundColor: "rgba(33, 33, 33, 0.85)",
  color: "#fff",
  borderRadius: 1,
  boxShadow: 2,
  p: 0.8, // padding pequeno
  minWidth: 160, // menor largura
  maxWidth: 200,
  "& .MuiTypography-root": {
    fontSize: "0.75rem",
  },
  "& .MuiIconButton-root": {
    color: "#fff",
    padding: "2px",
    "& svg": {
      fontSize: "0.95rem",
    },
  },
};

/** Cabeçalho do card (ícone + título) */
export const cardHeader: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 0.3,
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: "0.75rem",
  },
};

/** Conteúdo do card */
export const cardContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 0.3,
  "& .MuiFormControlLabel-label": {
    fontSize: "0.7rem",
  },
  "& .MuiCheckbox-root, & .MuiRadio-root": {
    padding: "2px",
  },
};

/** select */
export const selectCombo: SxProps<Theme> = {
  ml: 0,
  height: 24,          
  minWidth: 180,     
  fontSize: "0.65rem", 
  "& .MuiSelect-select": {
    padding: "0 4px",   
    display: "flex",
    alignItems: "center",
    fontSize: "0.65rem",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",  
  },
};

export const buttonSearch: SxProps<Theme> = {
  ml: 0.15,
  minWidth: 30,
  height: 28,
  minHeight: 28,
  padding: 0,
  fontSize: "0.75rem",
  lineHeight: 1,
  backgroundColor: "rgba(33, 33, 33, 0.85)",
};

export const searchInput: SxProps<Theme> = {
  flex: 1, 
  fontSize: "0.75rem",
  border: 1,
  px: 0.5,
  borderRadius: 1,
};