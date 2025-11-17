import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Tooltip,
  Badge,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Public";
import TerrainIcon from "@mui/icons-material/Terrain";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import LayersIcon from "@mui/icons-material/Layers";
import SearchIcon from "@mui/icons-material/Search";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import StraightenIcon from "@mui/icons-material/Straighten";
import GridOnIcon from "@mui/icons-material/GridOn";
import PrintIcon from "@mui/icons-material/Print";
import * as s from "./styles";

interface PainelFiltroMapaProps {
  mapType: string;
  onMapTypeChange: (type: string) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  onMeasureDistance: () => void;
  onPrint: () => void;
  isBasePanelOpen: boolean;
  onToggleBasePanel: () => void;
  isMeasurement: boolean;
  isShowGrid: boolean;
  setSearch: (valor: object) => void;
}

export default function PainelFiltroMapa({
  mapType,
  onMapTypeChange,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onMeasureDistance,
  onPrint,
  isBasePanelOpen,
  onToggleBasePanel,
  isMeasurement,
  isShowGrid,
  setSearch,
}: PainelFiltroMapaProps) {
  const [comboValue, setComboValue] = React.useState("fiscalizacao_spu");
  const [searchValue, setSearchValue] = React.useState("");

  // Definição das opções em um array
  const searchOptions = [
    // Fiscalização
    { value: "fiscalizacao_spu", label: "Fiscalização / SPU" },
    { value: "fiscalizacao_doc", label: "Fiscalização / N° Documento" },
    { value: "fiscalizacao_tipo_doc", label: "Fiscalização / Tipo Documento (AIF, TRM, NTF)" },
    { value: "fiscalizacao_cnpjcpf", label: "Fiscalização / CNPJ/CPF" },
    { value: "fiscalizacao_autuado", label: "Fiscalização / Autuado" },
    { value: "fiscalizacao_municipio", label: "Fiscalização / Município" },

    // Licenciamento
    { value: "licenciamento_spu", label: "Licenciamento / SPU" },
    { value: "licenciamento_doc", label: "Licenciamento / N° Documento" },
    { value: "licenciamento_cnpjcpf", label: "Licenciamento / CNPJ/CPF" },
    { value: "licenciamento_nome", label: "Licenciamento / Nome do Interessado" },
    { value: "licenciamento_municipio", label: "Licenciamento / Município" },
    { value: "licenciamento_tipo_zona", label: "Licenciamento / Tipo de Zona" },
    { value: "licenciamento_tipo_de_processo", label: " Licenciamento / Tipo de Processo" },
    { value: "licenciamento_atividade", label: " Licenciamento / Atividade" },
    { value: "licenciamento_situacao", label: " Licenciamento / Situação" },
    { value: "licenciamento_data_de_emissao", label: " Licenciamento / Data de Emissão" },
    { value: "licenciamento_data_de_abertura_do_processo", label: " Licenciamento / Data de Abertura do Processo" }
  ];

  const handlerSearch = () => {
    const searchParams = {
      tipo: comboValue,
      valor: searchValue,
    };
    
    if (searchParams && searchParams.tipo && searchParams.valor) {
      setSearch(searchParams);
    }
  }

  useEffect(() => {
    setSearchValue("");
  }, [comboValue]);

  return (
    <Paper sx={s.toolbar} className="no-print">
      {/* Linha 1: ícones */}
      <Box sx={s.iconRow} className="no-print">
        <Tooltip title={isBasePanelOpen ? "Ocultar Base Cartográfica" : "Mostrar Base Cartográfica"}>
          <IconButton
            onClick={onToggleBasePanel}
            color={isBasePanelOpen ? "primary" : "inherit"}
            aria-pressed={isBasePanelOpen}
          >
            <LayersIcon />
          </IconButton>
        </Tooltip>

        <Box sx={s.separator} />

        {/* Tipos de mapa */}
        <Tooltip title="Mapa Rodoviário">
          <IconButton
            onClick={() => onMapTypeChange("roadmap")}
            color={mapType === "roadmap" ? "primary" : "inherit"}
          >
            <MapIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Satélite">
          <IconButton
            onClick={() => onMapTypeChange("satellite")}
            color={mapType === "satellite" ? "primary" : "inherit"}
          >
            <SatelliteAltIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Híbrido">
          <IconButton
            onClick={() => onMapTypeChange("hybrid")}
            color={mapType === "hybrid" ? "primary" : "inherit"}
          >
            <LayersIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Terreno">
          <IconButton
            onClick={() => onMapTypeChange("terrain")}
            color={mapType === "terrain" ? "primary" : "inherit"}
          >
            <TerrainIcon />
          </IconButton>
        </Tooltip>

        <Box sx={s.separator} />

        {/* Ferramentas */}
        <Tooltip title="Zoom In">
          <IconButton onClick={onZoomIn} color="inherit">
            <ZoomInIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Zoom Out">
          <IconButton onClick={onZoomOut} color="inherit">
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Ativar Grade">
          <IconButton onClick={onToggleGrid}
            color={isShowGrid ? "primary" : "inherit"}>
            <GridOnIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Medir Distância">
          <IconButton onClick={onMeasureDistance}
            color={isMeasurement ? "primary" : "inherit"}>
            <StraightenIcon />
          </IconButton>
        </Tooltip>

        <IconButton onClick={onPrint} color="inherit">
          <PrintIcon />
        </IconButton>
      </Box>

      {/* Linha 2: busca + combobox + botão */}
      <Box sx={{ ...s.searchRow, display: "flex", gap: 0.5, alignItems: "center" }}>


        <Select
          value={comboValue}
          onChange={(e) => setComboValue(e.target.value)}
          size="small"
          sx={s.selectCombo}
        >
          {searchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ fontSize: "0.65rem", minHeight: 24 }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          variant="standard"
          placeholder="Pesquisar..."
          InputProps={{ disableUnderline: true }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={s.searchInput}
        />

        <Button
          variant="contained"
          size="small"
          sx={s.buttonSearch}
          onClick={() => handlerSearch()}
        >
          <SearchIcon sx={{ fontSize: "1rem" }} />
        </Button>
      </Box>
    </Paper>
  );
}




    // fiscalizacao_spu
    // fiscalizacao_doc
    // fiscalizacao_tipo_doc
    // fiscalizacao_cnpjcpf
    // fiscalizacao_autuado
    // fiscalizacao_municipio

    // // Licenciamento
    // licenciamento_spu
    // licenciamento_doc
    // licenciamento_cnpjcpf
    // licenciamento_nome
    // licenciamento_municipio
    // licenciamento_tipo_zona
    // licenciamento_tipo_de_processo
    // licenciamento_atividade
    // licenciamento_situacao
    // licenciamento_data_de_emissao
    // licenciamento_data_de_abertura_do_processo