import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

export const pageContainer: SxProps<Theme> = {
  backgroundColor: "#eaf0f6",
  minHeight: "100%",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

export const header: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export const headerTitle: SxProps<Theme> = {
  color: "#1e293b",
  fontWeight: 600,
};

export const searchField: SxProps<Theme> = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px transparent", // borda padrão
  transition: "border-color 0.2s ease-in-out",
  "&:focus-within": {
    borderColor: "#006837", // verde quando ativa
  },
};

export const tableContainer: SxProps<Theme> = {
  borderRadius: "12px",
  overflow: "hidden",
};

export const th: SxProps<Theme> = {
  fontWeight: 600,
  backgroundColor: "#006837", 
  color: "#ffffff",           
  textAlign: "center",         
  fontSize: "0.875rem",        
  padding: "10px 12px",        
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  borderBottom: "2px solid #004d26",
};


export const selectField: SxProps<Theme> = {
  minWidth: 160,
  backgroundColor: "#fff",
};

export const tooltipBox: SxProps<Theme> = {
  marginTop: "24px",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

export const tooltipTitle: SxProps<Theme> = {
  fontWeight: 600,
  color: "#1e293b",
  display: "flex",
  alignItems: "center",
};

export const info: SxProps<Theme> = {
  fontSize: 28, 
  color: "#006837" 
};

export const inputSearch: SxProps<Theme> = {
  fontSize: 28, 
  color: "#006837" 
};

export const button: SxProps<Theme> = {
  fontSize: "11px",  
  bgcolor: "#006837",
  width: "150px",
  height: "40px",
  "&:hover": {
    bgcolor: "#00572a",
  },
};

export const tooltipIcon: SxProps<Theme> = {
  fontSize: 28,
  color: "#006837",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};


