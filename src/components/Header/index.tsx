import React, { useState } from "react";
import {
  AppBar, Toolbar, Box, Typography, IconButton, Button, Drawer,
  useMediaQuery, useTheme, Popover, Divider, Snackbar, Alert
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import * as s from "./styles";
import logoCeara from "@/assets/logo-ceara.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearToast } from "@/redux/modules/toast/actions";

export default function Header(): JSX.Element {
  const authorization = useSelector((state: RootState) => state.auth);
  const toast = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleToastClose = () => dispatch(clearToast());

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  const menuItems = [{ label: "Home", path: "/" }];

  return (
    <>
      <AppBar position="static" sx={s.appBar}>
        <Toolbar sx={s.toolbar}>
          <Box sx={s.brand}>
            <Box component="img" src={logoCeara} alt="Governo do Ceará" sx={s.logo} />
            {!isMobile && (
              <Box>
                <Typography variant="h6" sx={s.title}>
                  Governo do Estado do Ceará
                </Typography>
                <Typography variant="body2">
                  Superintendência Estadual do Meio Ambiente - SEMACE
                </Typography>
              </Box>
            )}
          </Box>

          {isMobile ? (
            <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={s.actions}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mr: 2, color: "white" }}>
                GEOSEMACE
              </Typography>
              <IconButton color="inherit" onClick={handleUserClick}>
                {authorization.authorization?.roles.includes("ADMIN")
                  ? <AdminPanelSettingsIcon />
                  : <AccountCircleIcon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={s.drawerContent}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              fullWidth
              sx={s.drawerButton}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Drawer>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {authorization.authorization?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {authorization.authorization?.email}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            Tipo: <strong>{authorization.authorization?.roles.includes("ADMIN") ? "Administrador" : "Usuário"}</strong>
          </Typography>
        </Box>
      </Popover>

      {/* ✅ Toast global */}
      <Snackbar
        open={!!toast.message}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleToastClose} severity={toast.type} variant="filled" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
