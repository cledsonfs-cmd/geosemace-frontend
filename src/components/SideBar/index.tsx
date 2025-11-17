import React, { useState } from "react";
import { Box, Button, IconButton, useMediaQuery, useTheme, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import * as s from "./styles";
import { SideBarProps } from "./types";

export default function SideBar({ menuItems }: SideBarProps): JSX.Element | null {
  const theme = useTheme();
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);

  if (!isDesktop) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = loginUrl
  };

  return (
    <Box sx={s.root(open)} role="navigation" aria-label="Sidebar principal">
      {/* Botão para recolher/expandir */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={s.toggleBtn}
        size="small"
        aria-label={open ? "Recolher menu" : "Expandir menu"}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      {/* Área principal com menu e botão sair */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Itens do menu */}
        <Box sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <Tooltip key={item.path} title={!open ? item.label : ""} placement="right">
              <Button
                component={Link}
                to={item.path}
                sx={s.navBtn(open)}
                startIcon={item.icon}
              >
                {open && item.label}
              </Button>
            </Tooltip>
          ))}
        </Box>

        {/* Botão Sair fixo no rodapé */}
        <Tooltip title={!open ? "Sair" : ""} placement="right">
          <Button
            onClick={handleLogout}
            sx={{
              ...s.navBtn(open),
              mt: "auto",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
            startIcon={<LogoutIcon />}
          >
            {open && "Sair"}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
