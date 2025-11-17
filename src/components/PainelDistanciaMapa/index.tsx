import React from "react";
import {
  Box,
} from "@mui/material";
import * as s from "./styles";

interface PainelDistanciaMapaProps {
  distance: number;
}

export default function PainelDistanciaMapa({
distance
}: PainelDistanciaMapaProps) {
  return (
     <Box
          sx={s.painel}
        >
          Distância total:{" "}
          {distance > 1000
            ? (distance / 1000).toFixed(2) + " km"
            : distance.toFixed(2) + " m"}
    </Box>      
  );
}
