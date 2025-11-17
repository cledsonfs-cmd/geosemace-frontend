import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

/* ===== Painel flutuante (compacto) ===== */
export const floatingPanel: SxProps<Theme> = {
  position: "absolute",
  top: 30,
  right: 12,
  width: 260, // antes 320 → reduzido
  maxHeight: "75vh",
  backgroundColor: "rgba(33,33,33,0.88)", // mesmo tom do painel principal
  color: "#fff",
  borderRadius: 2,
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  zIndex: 20,
  animation: "fadeIn .25s ease",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-5px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

/* ===== Cabeçalho ===== */
export const header: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 1,
  py: 0.6,
  backgroundColor: "rgba(255,255,255,0.05)",
  "& .MuiTypography-root": { fontSize: 12, fontWeight: 600 },
};

export const closeButton: SxProps<Theme> = {
  color: "#fff",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
};

export const divider: SxProps<Theme> = {
  borderColor: "rgba(255,255,255,0.12)",
};

/* ===== Conteúdo ===== */
export const panelContainer: SxProps<Theme> = {
  px: 1,
  overflowY: "auto",
  "& .MuiTypography-root": { fontSize: 11.5 },
};

/* ===== Accordion ===== */
export const accordion: SxProps<Theme> = {
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  "&:before": { display: "none" },
  "& .MuiAccordionSummary-root": { minHeight: 30 },
  "& .MuiAccordionSummary-content": { my: 0.1 },
  "& .MuiAccordionSummary-content .MuiTypography-root": { fontSize: 12 },
};

/* ===== Checkbox ===== */
export const checkbox: SxProps<Theme> = {
  color: "rgba(255,255,255,0.6)",
  "&.Mui-checked": { color: "#4caf50" },
};

/* ===== Árvore ===== */
export const treeRoot: SxProps<Theme> = {
  color: "#fff",
  "& .MuiTreeItem-group": {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeft: "1px solid rgba(255,255,255,0.25)",
  },
};

export const treeItem: SxProps<Theme> = {
  "& .MuiTreeItem-content.Mui-selected, & .MuiTreeItem-content.Mui-focused": {
    backgroundColor: "transparent",
  },
  "& .MuiTreeItem-content:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
};

export const treeFolderLabel: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 0.4,
  "& svg": { color: "rgba(255,255,255,0.9)", fontSize: 14 },
  "& .MuiTypography-root": { fontSize: 12 },
};

export const treeCheckbox: SxProps<Theme> = {
  m: 0,
  "& .MuiTypography-root": { fontSize: 11.5 },
  "& .MuiCheckbox-root": {
    p: 0.2,
    mr: 0.6,
    transform: "scale(0.85)",
    color: "rgba(255,255,255,0.65)",
    "&.Mui-checked": { color: "#4caf50" },
  },
};

export const treeLeaf: SxProps<Theme> = {
  position: "relative",
  "& .MuiTreeItem-content": {
    position: "relative",
    paddingLeft: 0,
    "&:before": {
      content: '""',
      position: "absolute",
      left: -10,
      top: "50%",
      width: 10,
      height: 1,
      background: "rgba(255,255,255,0.25)",
      transform: "translateY(-50%)",
    },
  },
};

/* ===== Resumo ===== */
export const summaryCard: SxProps<Theme> = {
  position: "absolute",
  top: 190,
  right: 12 + 260 + 12,
  width: 260,
  backgroundColor: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(14px) saturate(140%)",
  WebkitBackdropFilter: "blur(14px) saturate(140%)",
  borderRadius: "14px",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  overflow: "hidden",
  maxHeight: "70vh",
  zIndex: 19,
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",

  "@media (max-width: 960px)": {
    right: 12 + 260 + 8,
    width: 230,
  },

  "&:hover": {
    boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
    transform: "translateY(-2px)",
  },
};

export const summaryHeader = {
  backgroundColor: "rgba(245, 248, 252, 0.6)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderBottom: "1px solid rgba(255,255,255,0.3)",
  px: 1.5,
  py: 0.8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiTypography-root": {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "rgba(17, 24, 39, 0.85)",
  },
} as const;

export const summaryBody: SxProps<Theme> = {
  px: 1.5,
  py: 1,
  display: "grid",
  gap: 0.8,
  overflowY: "auto",
  maxHeight: "calc(70vh - 60px)",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 3,
  },
};

export const summaryItem: SxProps<Theme> = {
  p: 1,
  borderRadius: 1.5,  
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px) saturate(130%)",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  transition: "all 0.25s ease",
  cursor: "default",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transform: "translateY(-1px)",
  },

  "& .MuiTypography-root": {
    fontSize: 12.5,
    color: "rgba(17, 24, 39, 0.85)",
    lineHeight: 1.4,
  },
};
