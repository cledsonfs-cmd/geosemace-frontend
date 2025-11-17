import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  Divider,
  Paper,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useMemo, useState } from "react";
import * as s from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { camadasAtivasRequest } from "@/redux/modules/camada/actions";

/* ==========================================================
   PROPS
========================================================== */
export interface PainelCamadasMapaProps {
  open: boolean;
  onClose: () => void;
  setCamadaFiltro: (valores: any) => void;
  setLoading: (valor: boolean) => void;
  setCamadas: (valor: any) => void;
}

/* ==========================================================
   COMPONENTE DE CHECKBOX
========================================================== */
function LabelCheckbox({
  label,
  checked,
  indeterminate,
  onChange,
}: {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormControlLabel
      sx={s.treeCheckbox}
      control={
        <Checkbox
          size="small"
          checked={checked}
          indeterminate={indeterminate}
          onChange={onChange}
        />
      }
      label={<Typography variant="body2">{label}</Typography>}
    />
  );
}

/* ==========================================================
   FUNÇÃO AUXILIAR PARA GERAR KEY ÚNICA
========================================================== */
const getBaseKey = (
  idlegenda: number,
  idbase: number,
  idshape: number,
  gid: number
) => `${idlegenda}_${idbase}_${idshape}_${gid}`;

/* ==========================================================
   FUNÇÃO PARA GERAR BASES
========================================================== */
const gerarBases = async (item: any) => {
  try {
    if (!item?.campos || !item?.url) {
      return [];
    }

    const camposArray = item.campos
      .split(",")
      .map((c: string) => c.trim())
      .filter(Boolean);

    const campos = camposArray.join(",");
    const ordenacao = camposArray[1];

    const url = `${item.url}?service=${item.service}&version=${item.version}&request=GetFeature&typeName=${item.camadaGeoserver}&propertyName=${campos}${item.filtros ? "&CQL_FILTER=" + item.filtros : ""}&sortBy=${ordenacao}+A&outputFormat=application/json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do WFS");
    }

    const data = await response.json();
    const camposSelecionados = campos.split(",").map((c: string) => c.trim());

    const nomesGenericos = ["id", "nome"];

    const resultados = data.features.map((f: any) => {
      const obj: any = {};
      camposSelecionados.forEach((campo: string, i: number) => {
        const nomeGenerico = nomesGenericos[i] || campo;
        obj[nomeGenerico] = f.properties[campo];
      });
      return obj;
    });

    return resultados;

  } catch (error) {
    console.error("Erro em gerarBases:", error);
    return [];
  }
};

/* ==========================================================
   COMPONENTE PRINCIPAL
========================================================== */
export default function PainelCamadasMapa({
  open,
  onClose,
  setCamadaFiltro,
  setLoading,
  setCamadas,
}: PainelCamadasMapaProps) {
  const dispatch = useDispatch();
  const { camadas } = useSelector((state: RootState) => state.camada);

  const [dados, setDados] = useState<any[]>([]);
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  /* ==========================================================
     REQUISIÇÃO INICIAL
  ========================================================== */
  useEffect(() => {
    dispatch(camadasAtivasRequest());
  }, [dispatch]);

  /* ==========================================================
     AGRUPAR DADOS POR LEGENDA
  ========================================================== */
  const agruparPorLegenda = async (lista: any[]) => {
    const mapa = new Map<string, any>();
    for (const item of lista) {
      if (!mapa.has(item.nomeDaFonte)) {
        mapa.set(item.nomeDaFonte, {
          idlegenda: item.id,
          legenda: item.nomeDaFonte,
          cor: item.corCamada,
          grupos: [],
        });
      }

      const bases = await gerarBases(item);

      mapa.get(item.nomeDaFonte).grupos.push({
        shape: item.nome,
        idbase: item.id,
        tabela: item.nome,
        idshape: item.id,
        bases,
      });
    }


    return Array.from(mapa.values());
  };

  /* ==========================================================
     ATUALIZA ESTRUTURA RECEBIDA DO REDUX
  ========================================================== */
  useEffect(() => {
    if (camadas?.length) {
      (async () => {
        const agrupado = await agruparPorLegenda(camadas);
        setDados(agrupado);

        // 🔹 Total geral de camadas disponíveis
        let totalBases = 0;
        agrupado.forEach((legenda) => {
          legenda.grupos.forEach((grupo: any) => {
            totalBases += grupo.bases?.length || 0;
          });
        });

        setCamadas(totalBases);
      })();
    }
  }, [camadas]);

  /* ==========================================================
     INICIALIZA CHECKBOXES
  ========================================================== */
  useEffect(() => {
    const initialChecked: any = {};
    dados.forEach((legenda) => {
      legenda.grupos.forEach((grupo: any) => {
        grupo.bases?.forEach((baseItem: any) => {
          const key = getBaseKey(
            legenda.idlegenda,
            grupo.idbase,
            grupo.idshape,
            baseItem.id
          );
          initialChecked[key] = false;
        });
      });
    });
    setChecked(initialChecked);
  }, [dados]);

  /* ==========================================================
     FUNÇÕES AUXILIARES
  ========================================================== */
  const toggleBase = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const getPrimeiroNome = (dados: any) => {    
    if (!dados) return "";
    if (typeof dados === "string") return dados;
    return dados.nome || dados.id || "";
  };

  /* ==========================================================
     LISTA DE RESUMO (ITENS MARCADOS)
  ========================================================== */
  const summaryList = useMemo(() => {
    const marcados: any[] = [];
    dados.forEach((legenda) => {
      legenda.grupos.forEach((grupo: any) => {
        grupo.bases?.forEach((baseItem: any) => {
          const key = getBaseKey(
            legenda.idlegenda,
            grupo.idbase,
            grupo.idshape,
            baseItem.id
          );          

          if (checked[key]) {
            marcados.push({
              idlegenda: legenda.idlegenda, // usado no setCamadaFiltro
              legenda: legenda.legenda,
              shape: grupo.shape,
              estrutura: baseItem,
              valor: [grupo.tabela, baseItem.id],
              cor: legenda.cor,
              nomeShape: (baseItem.municipio ? baseItem.nome + " - " +baseItem.municipio : baseItem.nome),
              idbase: grupo.idbase
            });
          }
        });
      });
    });
    return marcados;
  }, [checked, dados]);

  /* ==========================================================
     EFEITO: PASSAR IDLEGENDA PARA setCamadaFiltro
  ========================================================== */
  useEffect(() => {
    const valores = summaryList.map((item) => ({
      idBase: item.idbase,
      idShape: item.estrutura.id + '_' + item.idbase,
      cor: item.cor,
      nome: item.nomeShape
    }));
    setCamadaFiltro(valores);

  }, [summaryList]);

  if (!open) return null;

  const hexToRgba = (hex: string, alpha = 1) => {
    if (!hex) return null;
    const h = hex.replace("#", "");
    if (h.length !== 6) return null;
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /* ==========================================================
     RENDER
  ========================================================== */
  return (
    <div className="no-print">
      {/* ====== RESUMO ====== */}
      {summaryList.length > 0 && (
        <Paper elevation={3} sx={s.summaryCard}>
          <Box sx={s.summaryHeader}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              ESTRUTURAS SELECIONADAS
            </Typography>
          </Box>

          {summaryList.map((item, idx) => (
            <Accordion
              key={idx}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: item.cor
                  ? `${item.cor}66`
                  : "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                mb: 1.5,
                "&:before": { display: "none" },
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
                sx={{
                  minHeight: 36,
                  "& .MuiAccordionSummary-content": { my: 0 },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#000",
                    fontSize: "0.85rem",
                  }}
                >
                  {item.nomeShape}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  pt: 0.5,
                  pb: 1.2,
                  pl: 1.2,
                  pr: 1.2,
                  backgroundColor: `${item.cor}33` || "rgba(255,255,255,0.05)",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  <strong>Legenda:</strong> {item.legenda}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  <strong>Shape:</strong> {item.shape}
                </Typography>
                <hr/>

                {Object.entries(item.estrutura)
                  .slice(0, -1)
                  .map(([campo, valor]) => (
                    <Typography
                      key={campo}
                      variant="body2"
                      sx={{
                        
                        fontSize: "0.8rem",
                        color: "#000",
                      }}
                    >
                      <strong>{campo}:</strong> {String(valor)}
                    </Typography>
                  ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      )}



      {/* ====== PAINEL ====== */}
      <Box sx={s.floatingPanel}>
        <Box sx={s.header}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Base Cartográfica
          </Typography>
          <IconButton size="small" onClick={onClose} sx={s.closeButton}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={s.divider} />

        <Box
          sx={{
            maxHeight: "65vh",
            overflowY: "auto",
            pr: 1,
            backgroundColor: "#2c2c2c",
            color: "#fff",
            "& .MuiAccordion-root": {
              backgroundColor: "transparent",
              color: "#fff",
              "&:before": { display: "none" },
            },
            "& .MuiAccordionSummary-root": {
              backgroundColor: "transparent",
              color: "#fff",
            },
            "& .MuiAccordionDetails-root": {
              backgroundColor: "transparent",
              color: "#fff",
              padding: "0 16px 8px 16px",
            },
            "& .MuiFormControlLabel-root": {
              color: "#fff",
            },
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
          }}
        >
          {dados.map((legenda) => (
            <Accordion key={legenda.idlegenda} sx={s.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {legenda.legenda}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {legenda.grupos.map((grupo: any) => (
                  <Accordion key={grupo.idshape} sx={s.subAccordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {grupo.shape}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormGroup>
                        {grupo.bases?.map((baseItem: any) => {
                          const key = getBaseKey(
                            legenda.idlegenda,
                            grupo.idbase,
                            grupo.idshape,
                            baseItem.id
                          );
                          return (
                            <LabelCheckbox
                              key={key}
                              label={getPrimeiroNome(baseItem) +`${baseItem.municipio ? " - "+baseItem.municipio : ""}`+`${baseItem.geocodigo ? "_"+baseItem.geocodigo : ""}`|| `${baseItem.id}`}
                              checked={!!checked[key]}
                              onChange={toggleBase(key)}
                            />
                          );
                        })}
                      </FormGroup>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </div>
  );
}
