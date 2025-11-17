import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import * as s from "./styles";

export default function MainLayout(): JSX.Element {
  return (
    <Box sx={s.root}>
      <Header />
      <Box sx={s.content}>
        <Menu />
        <Box component="main" sx={s.main}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
