import React from "react";
import { Box, Tooltip, Typography, Fade } from "@mui/material";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import * as styles from "./styles";

interface CustomTooltipProps {
  tipo: "Poligono" | "Linha" | "Ponto";
  children: React.ReactElement;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ tipo, children }) => {
  const renderContent = () => {
    switch (tipo) {
      case "Poligono":
        return (
          <Box sx={styles.tooltipCard}>
            <CropSquareOutlinedIcon sx={styles.tooltipIcon} />
            <Typography variant="body2">
              O ícone de quadrado representa <b>polígonos</b>. Polígonos são usados
              para representar áreas como municípios, estados, parques ou qualquer
              outra região delimitada.
            </Typography>
          </Box>
        );
      case "Linha":
        return (
          <Box sx={styles.tooltipCard}>
            <ShowChartOutlinedIcon sx={styles.tooltipIcon} />
            <Typography variant="body2">
              O ícone de linhas representa <b>elementos lineares</b>. São usados para
              mostrar rodovias, ferrovias, rios ou trilhas.
            </Typography>
          </Box>
        );
      default:
        return (
          <Box sx={styles.tooltipCard}>
            <PinDropOutlinedIcon sx={styles.tooltipIcon} />
            <Typography variant="body2">
              O ícone de ponto representa <b>localizações específicas</b>. Pontos são
              usados para aeródromos, estações, marcos e coordenadas.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Tooltip
      title={renderContent()}
      placement="right"
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      componentsProps={{
        tooltip: { sx: styles.tooltipWrapper },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
