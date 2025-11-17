import React from "react";
import { Box, Typography } from "@mui/material";
import * as s from "./styles";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  

  return (
    <Box component="footer" sx={s.footerRoot}>
      <Box sx={s.footerRow}>      

        <Typography variant="caption">
          © {year} Governo do Estado do Ceará - Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}



