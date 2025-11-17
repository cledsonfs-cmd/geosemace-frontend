import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import * as styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Tabela from "@/components/Tabela";
import { CadastroCamadaModal } from "@/components/CadastroCamadaModal";

import { camadasRequest, savarCamadaRequest, excluirCamadaRequest } from "@/redux/modules/camada/actions";
import { Camada } from "@/redux/modules/camada/interfaces";

interface CamadaLocal {
  id: number;
  tipo: string;
  titulo: string;
  nome?: string;
  campos?: string;
  filtros?: string;
  ativo: boolean;
  url?: string;
  camadaGeoserver?: string;
  version?: string;
  service?: string;
  corCamada?: string;
}

const ListaCamadas: React.FC = () => {
  const dispatch = useDispatch();

  const [busca, setBusca] = useState("");
  const [camadasLocal, setCamadasLocal] = useState<CamadaLocal[]>([]);
  const [open, setOpen] = useState(false);

  const authorization = useSelector((state: RootState) => state.auth);
  const dadosCamada = useSelector((state: RootState) => state.camada);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSave = (data: any) => {        
    dispatch(savarCamadaRequest(data));    
  };

  const handleHabilitarDesabilitar = (data: any) => {        
    dispatch(savarCamadaRequest({
      id: data.id,
      nome: data.nome,
      url: data.url,
      tipoDeCamada: data.tipo,
      nomeDaFonte: data.nomeDaFonte,
      camadaGeoserver: data.camadaGeoserver,
      formatoPadrao: data.formatoPadrao,
      campos: data.campos,
      filtros: data.filtros,
      ativo: !data.ativo,
      service: data.service,
      version: data.version,
      crieadoEm: data.criadoEm,
      atualizadoEm: data.atualizadoEm,
      corCamada: data.corCamada,
    }));    
  };
  
  const handleAtualizarCor = (data: any) => {        
    dispatch(savarCamadaRequest({
      id: data.id,
      nome: data.nome,
      url: data.url,
      tipoDeCamada: data.tipo,
      nomeDaFonte: data.nomeDaFonte,
      camadaGeoserver: data.camadaGeoserver,
      formatoPadrao: data.formatoPadrao,
      campos: data.campos,
      filtros: data.filtros,
      ativo: data.ativo,
      service: data.service,
      version: data.version,
      crieadoEm: data.criadoEm,
      atualizadoEm: data.atualizadoEm,
      corCamada: data.corCamada,
    }));    
  };
  
  const handleExcluir = (id: number) => {    
    dispatch(excluirCamadaRequest(id));    
  };

  // Buscar camadas ao carregar a página
  useEffect(() => {
    dispatch(camadasRequest());
  }, [dispatch]);

  // Atualizar estado local das camadas
  useEffect(() => {
    if (Array.isArray(dadosCamada?.camadas)) {
      setCamadasLocal(
        dadosCamada?.camadas?.map((camada: Camada) => ({
          id: camada.id ?? 0,
          tipo: camada.tipoDeCamada ?? "",
          titulo: camada.nome ?? "",
          nome: camada.nome ?? "",
          campos: camada.campos ?? "",
          filtros: camada.filtros ?? "",
          ativo: camada.ativo ?? false,
          url: camada.url ?? "",
          camadaGeoserver: camada.camadaGeoserver ?? "",
          version: camada.version ?? "",
          service: camada.service ?? "",
          formatoPadrao: camada.formatoPadrao ?? "",
          criadoEm: camada.criadoEm ?? undefined,
          atualizadoEm: camada.atualizadoEm ?? undefined,
          nomeDaFonte: camada.nomeDaFonte ?? "",
          corCamada: camada.corCamada ?? "#3388ff",
        }))
      );
    }
  }, [dadosCamada.camadas]);

  return (
    <Box sx={styles.pageContainer}>
      {/* Header */}
      <Box sx={{ ...styles.header, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InfoOutlinedIcon sx={styles.info} />
          <Typography variant="h6" sx={styles.headerTitle}>
            Visualizar Camadas Geoespaciais
          </Typography>
        </Box>
        {authorization.authorization?.roles.includes("ADMIN") && (
          <Button variant="contained" sx={styles.adicionarButton} onClick={handleOpenModal}>
            Adicionar Camada
          </Button>
        )}
      </Box>

      {/* Campo de busca */}
      <TextField
        variant="outlined"
        placeholder="Buscar camadas por palavras-chave"
        fullWidth
        size="small"
        sx={styles.searchField}
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* Tabela */}
      <Tabela
        camadas={camadasLocal}
        busca={busca}
        setCamadas={setCamadasLocal}
        onExcluir={handleExcluir}
        onHabilitarDesabilitar={handleHabilitarDesabilitar}
        onAtualizarCor={handleAtualizarCor}
      />

      {/* Modal Cadastro Camada */}
      <CadastroCamadaModal
        open={open}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </Box>
  );
};

export default ListaCamadas;
