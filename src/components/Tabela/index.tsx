import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Paper,
  Tooltip,
  TablePagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import * as styles from "./styles";
import CustomTooltip from "../CustomTooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ConfirmDialog from "../ConfirmDialog";
import ConfirmCorDialog from "../ConfirmCorDialog"; // ✅ novo componente de mudar cor

interface CamadaLocal {
  id: number;
  tipo: string;
  titulo: string;
  nome?: string;
  campos?: string;
  filtros?: string;
  ativo?: boolean;
  url?: string;
  camadaGeoserver?: string;
  version?: string;
  service?: string;
  formatoPadrao?: string;
  nomeDaFonte?: string;
  corCamada?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export interface TabelaProps {
  camadas: CamadaLocal[];
  busca: string;
  setCamadas: (camadas: CamadaLocal[]) => void;
  onExcluir?: (id: number) => void;
  onHabilitarDesabilitar?: (camada: any) => void;
  onAtualizarCor?: (camada: CamadaLocal) => void; // ✅ callback opcional
}

export default function Tabela({
  camadas,
  busca,
  setCamadas,
  onExcluir,
  onHabilitarDesabilitar,
  onAtualizarCor,
}: TabelaProps) {
  const authorization = useSelector((state: RootState) => state.auth);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmCorOpen, setConfirmCorOpen] = useState(false); // ✅ novo dialog de cor
  const [camadaSelecionada, setCamadaSelecionada] = useState<CamadaLocal | null>(null);
  const [acaoTipo, setAcaoTipo] = useState<"excluir" | "habilitar" | null>(null);
  const [novaCor, setNovaCor] = useState<string | null>(null); // ✅ cor escolhida

  const camadasFiltradas = camadas.filter((c) =>
    c.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [camadas]);

  useEffect(() => setPage(0), [busca]);

  // ✅ Abre o modal de cor
  const handleAbrirDialogCor = (camada: CamadaLocal) => {
    setCamadaSelecionada(camada);
    setNovaCor(camada.corCamada || "#cccccc");
    setConfirmCorOpen(true);
  };

  // ✅ Atualiza cor da camada
  const handleUpdateCor = () => {
    if (!camadaSelecionada || !novaCor) return;

    const atualizadas = camadas.map((c) =>
      c.id === camadaSelecionada.id ? { ...c, corCamada: novaCor } : c
    );
    setCamadas(atualizadas);

    if (onAtualizarCor) {
      onAtualizarCor({ ...camadaSelecionada, corCamada: novaCor });
    }

    setConfirmCorOpen(false);
    setCamadaSelecionada(null);
  };

  return (
    <Paper sx={styles.tableContainer}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            flexDirection: "column",
          }}
        >
          <CircularProgress size={48} />
          <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
            Carregando dados...
          </Typography>
        </Box>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.th}>Tipo</TableCell>
                <TableCell sx={styles.th}>Título</TableCell>
                <TableCell sx={styles.th}>Fonte</TableCell>
                <TableCell sx={styles.th}>Campos</TableCell>
                <TableCell sx={styles.th}>Filtros</TableCell>
                <TableCell sx={styles.th}>Service</TableCell>
                <TableCell sx={styles.th}>Versão</TableCell>
                <TableCell sx={styles.th}>Ativo</TableCell>
                <TableCell sx={styles.th}>Cor</TableCell>
                <TableCell align="center" sx={styles.th}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {camadasFiltradas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((camada) => (
                  <TableRow key={camada.id}>
                    <TableCell>
                      <CustomTooltip tipo={camada.tipo as any}>
                        <Box sx={styles.tooltipIcon}>
                          {camada.tipo === "Poligono" ? (
                            <CropSquareOutlinedIcon />
                          ) : camada.tipo === "Linha" ? (
                            <ShowChartOutlinedIcon />
                          ) : (
                            <PinDropOutlinedIcon />
                          )}
                        </Box>
                      </CustomTooltip>
                    </TableCell>

                    <TableCell align="center">{camada.titulo}</TableCell>
                    <TableCell align="center">{camada.nome}</TableCell>
                    <TableCell align="center" sx={{
                      width: "50%",
                      whiteSpace: "normal",
                      wordBreak: "break-word", // permite quebrar dentro de palavras longas
                    }}>{camada.campos}</TableCell>
                    <TableCell align="center">  {camada.filtros ? camada.filtros.replace(/%27/g, '"') : ""}
                    </TableCell>
                    <TableCell align="center">{camada.service}</TableCell>
                    <TableCell align="center">{camada.version}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          
                            setCamadaSelecionada(camada);
                            setAcaoTipo("habilitar");
                            setConfirmOpen(true);
                          
                        }}
                      >
                        {camada.ativo ? (
                          <CheckBoxIcon color="success" />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                    </TableCell>

                    {/* === COR === */}
                    <TableCell align="center">
                      <Tooltip title="Alterar cor da camada">
                        <div
                          onClick={() => {
                            
                              handleAbrirDialogCor(camada)
                            
                          }}
                          style={{
                            backgroundColor: camada.corCamada || "#cccccc",
                            width: 24,
                            height: 24,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            display: "inline-block",
                          }}
                        ></div>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      
                        <Tooltip title="Excluir camada">
                          <IconButton
                            onClick={() => {
                              setCamadaSelecionada(camada);
                              setAcaoTipo("excluir");
                              setConfirmOpen(true);
                            }}
                          >
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </Tooltip>                      

                      <Tooltip title="Baixar camada">
                        <IconButton
                          onClick={() => {
                            if (!camada.url) return;
                            const link = document.createElement("a");
                            link.href = `${camada.url}?service=${camada.service}&version=${camada.version}&request=GetFeature&typeName=${camada.camadaGeoserver}${camada.filtros ? "&CQL_FILTER=" + camada.filtros : ""}&outputFormat=SHAPE-ZIP`;
                            link.download = `${camada.camadaGeoserver}.zip`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <CloudDownloadOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={camadasFiltradas.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />

          {/* === DIALOG DE EXCLUIR/HABILITAR === */}
          <ConfirmDialog
            open={confirmOpen}
            title={acaoTipo === "excluir" ? "Excluir camada?" : "Alterar status?"}
            message={
              acaoTipo === "excluir"
                ? `Deseja realmente excluir a camada?`
                : `Deseja ${camadaSelecionada?.ativo ? "desabilitar" : "habilitar"} a camada?`
            }
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => {
              if (acaoTipo === "excluir" && camadaSelecionada) {
                onExcluir?.(camadaSelecionada.id);
              } else if (acaoTipo === "habilitar" && camadaSelecionada) {
                onHabilitarDesabilitar?.(camadaSelecionada);
              }
              setConfirmOpen(false);
            }}
          />

          {/* === DIALOG DE COR === */}
          <ConfirmCorDialog
            open={confirmCorOpen}
            title="Alterar cor da camada"
            camadaTitulo={camadaSelecionada?.titulo}
            colorValue={novaCor || "#cccccc"}
            onColorChange={(color) => setNovaCor(color)}
            onCancel={() => setConfirmCorOpen(false)}
            onConfirm={handleUpdateCor}
          />
        </>
      )}
    </Paper>
  );
}
