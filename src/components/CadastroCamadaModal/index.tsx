import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as styles from "./styles";

interface CadastroCamadaModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

interface FormData {
  nome: string;
  url: string;
  tipoDeCamada: string;
  nomeDaFonte: string;
  camadaGeoserver: string;
  formatoPadrao: string;
  campos: string;
  filtros: string;
  ativo: boolean;
  corCamada: string;
  service?: string;
  version?: string;
}

interface CamadaWFS {
  name: string;
  title: string;
  abstract: string;
}

export interface CampoWFS {
  name: string;
  type: string;
}

export const CadastroCamadaModal: React.FC<CadastroCamadaModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const initialFormState: FormData = {
    nome: "",
    url: "",
    tipoDeCamada: "",
    nomeDaFonte: "",
    camadaGeoserver: "",
    formatoPadrao: "application/json",
    campos: "",
    filtros: "",
    service: "",
    version: "",
    ativo: true,
    corCamada: "#3388ff",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [servicosAtivos, setServicosAtivos] = useState<string[]>([]);
  const [camadas, setCamadas] = useState<CamadaWFS[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [campos, setCampos] = useState<CampoWFS[]>([]);

  useEffect(() => {
    if (open) setFormData(initialFormState);
  }, [open]);

  useEffect(() => {
    if (!formData.url) return;

    const urlBase = formData.url;
    const tiposServicos = ["WMS", "WFS", "WCS", "WPS"];

    const detectar = async () => {
      const encontrados: string[] = [];

      try {
        for (const tipo of tiposServicos) {
          const url = `${urlBase}?service=${tipo}&request=GetCapabilities`;

          const response = await fetch(url);
          const text = await response.text();

          // Verifica se é um GetCapabilities válido
          if (text.includes("Capabilities") && !text.includes("ExceptionReport")) {
            encontrados.push(tipo);
          }
        }

        setServicosAtivos(encontrados);
      } catch (error) {
        console.error("Erro ao detectar serviços:", error);
        setServicosAtivos([]);
      }
    };

    detectar();
  }, [formData.url]);

  useEffect(() => {
    if (!formData.url || !formData.service) return;

    const fetchCapabilities = async () => {
      try {
        const url = `${formData.url}?service=${formData.service}&request=GetCapabilities`;
        const response = await fetch(url);
        const rawText = await response.text();

        let xmlText = rawText;

        // 🩵 Caso venha como JSON ou lista em string, tentar converter
        try {
          const parsed = JSON.parse(rawText);
          if (Array.isArray(parsed)) {
            // Junta todos os itens e subitens em uma única string
            xmlText = parsed.flat(Infinity).join("");
          }
        } catch {
          // não era JSON — segue com XML normal
        }

        // 🧩 Captura blocos de <FeatureType>
        const featureBlocks = [...xmlText.matchAll(/<FeatureType[\s\S]*?<\/FeatureType>/g)];

        const list: CamadaWFS[] = featureBlocks.map((block) => {
          const name = block[0].match(/<Name>(.*?)<\/Name>/)?.[1] || "";
          const title = block[0].match(/<Title>(.*?)<\/Title>/)?.[1] || name;
          const abstract = block[0].match(/<Abstract>(.*?)<\/Abstract>/)?.[1] || "";

          return { name, title, abstract };
        });

        let filtradas = list;

        if (formData.tipoDeCamada === "Poligono") {
          filtradas = list.filter((c) => {
            const nome = c.name.toLowerCase();
            return (
              nome.includes("poligono") ||
              nome.includes("poligonais") ||
              nome.includes("poligos") ||
              nome.endsWith("_pol")
            );
          });
        } else if (formData.tipoDeCamada === "Ponto") {
          filtradas = list.filter((c) => {
            const nome = c.name.toLowerCase();
            return (
              nome.includes("ponto") ||
              nome.includes("pontos") ||
              nome.endsWith("_pto")
            );
          });
        } else if (formData.tipoDeCamada === "Linha") {
          filtradas = list.filter((c) => {
            const nome = c.name.toLowerCase();
            return (
              nome.includes("linha") ||
              nome.includes("linhas") ||
              nome.endsWith("_lin")
            );
          });
        } else {
          // ✅ Retorna apenas camadas que não são ponto, linha ou polígono
          filtradas = list.filter((c) => {
            const nome = c.name.toLowerCase();
            return !(
              nome.includes("poligono") ||
              nome.includes("poligonais") ||
              nome.includes("poligos") ||
              nome.endsWith("_pol") ||
              nome.includes("ponto") ||
              nome.includes("pontos") ||
              nome.endsWith("_pto") ||
              nome.includes("linha") ||
              nome.includes("linhas") ||
              nome.endsWith("_lin")
            );
          });
        }

        setCamadas(filtradas);
      } catch (error) {
        console.error("Erro ao buscar capabilities WFS:", error);
        setCamadas([]);
      }
    };

    fetchCapabilities();
  }, [formData.url, formData.service, formData.tipoDeCamada]);



  useEffect(() => {
    if (!formData.url || !formData.service) return;

    const fetchVersions = async () => {
      try {
        const url = `${formData.url}?service=${formData.service}&request=GetCapabilities`;

        const response = await fetch(url);
        const xmlText = await response.text();

        // Extrai todas as <ows:ServiceTypeVersion> encontradas
        const matches = [...xmlText.matchAll(/<ows:ServiceTypeVersion>(.*?)<\/ows:ServiceTypeVersion>/g)];
        const found = matches.map((m) => m[1]);

        // Se não tiver <ows:ServiceTypeVersion>, tenta fallback com <Version>
        if (found.length === 0) {
          const fallback = [...xmlText.matchAll(/<Version>(.*?)<\/Version>/g)].map((m) => m[1]);
          setVersions([...new Set(fallback)]);
        } else {
          setVersions([...new Set(found)]);
        }

      } catch (error) {
        console.error("Erro ao detectar versões:", error);
        setVersions([]);
      }
    };

    fetchVersions();
  }, [formData.url, formData.service]);

  useEffect(() => {
    if (!formData.url || !formData.service || !formData.version || !formData.camadaGeoserver) return;

    const fetchFields = async () => {
      try {
        const url = `${formData.url}?service=${formData.service}&version=${formData.version}&request=DescribeFeatureType&typeName=${formData.camadaGeoserver}`;

        const response = await fetch(url);
        const xmlText = await response.text();

        // Extrai cada campo do schema (xsd:element name="campo" type="xsd:tipo")
        const matches = [...xmlText.matchAll(/<xsd:element[^>]*name="(.*?)"[^>]*type="(.*?)"/g)];

        const list = matches.map((m) => ({
          name: m[1],
          type: m[2].replace("xsd:", ""),
        }));

        setCampos(list);
      } catch (error) {
        console.error("Erro ao buscar campos WFS:", error);
        setCampos([]);
      }
    };

    fetchFields();
  }, [formData.url, formData.service, formData.camadaGeoserver, formData.version]);

  useEffect(() => {
    if (!formData.url || !formData.service || !formData.version || !formData.camadaGeoserver) return;

    const fetchFields = async () => {
      try {
        const url = `${formData.url}?service=${formData.service}&version=${formData.version}&request=DescribeFeatureType&typeName=${formData.camadaGeoserver}`;

        const response = await fetch(url);
        const xmlText = await response.text();

        // Extrai os campos (name + type)
        const matches = [
          ...xmlText.matchAll(/<xsd:element[^>]*name="(.*?)"[^>]*type="(.*?)"/g),
        ];

        const campos = matches.map((m) => ({
          name: m[1],
          type: m[2],
        }));

        // Campos normais (não GML)
        const camposNormais = campos.filter((c) => {
          const typeLower = c.type.toLowerCase();
          return !typeLower.includes("gml:") && !typeLower.includes("tis_poligonais");
        });

        // Campos GML (qualquer tipo de geometria)
        const camposGML = campos.filter((c) =>
          c.type.toLowerCase().includes("gml:")
        );

        // --- 🔹 Ordenação personalizada com identificador dinâmico ---
        const ordenarCampos = (lista: string[]): string[] => {
          if (lista.length === 0) return [];

          // Pega o primeiro campo como identificador (pode ser gid, id, etc.)
          const identificador = lista[0];
          const semIdentificador = lista.slice(1);

          // Campos que contenham "nome", "name" ou "municipio"
          const camposNome = semIdentificador.filter(
            (c) =>
              c.toLowerCase().includes("nome") ||
              c.toLowerCase().includes("name") ||
              c.toLowerCase().includes("municipio")
          );

          const camadaLower = formData.camadaGeoserver
            ? formData.camadaGeoserver.toLowerCase().split(":").pop() // remove prefixo (ex: "Funai:")
            : "";

          // Demais campos
          const camposOutros = semIdentificador.filter(
            (c) =>
              !c.toLowerCase().includes("nome") &&
              !c.toLowerCase().includes("name") &&
              !c.toLowerCase().includes("municipio") &&
              !c.toLowerCase().includes(camadaLower)
          );

          // Reordena: identificador → camposNome → camposOutros
          return [identificador, ...camposNome, ...camposOutros].filter(Boolean);
        };

        // Aplica a ordenação apenas nos campos normais
        const camposNormaisOrdenados = ordenarCampos(camposNormais.map((c) => c.name));

        // Monta a lista final (normais primeiro, GML no final)
        const listaFinal = [
          ...camposNormaisOrdenados,
          ...camposGML.map((c) => c.name),
        ].join(",");

        setFormData({ ...formData, campos: listaFinal });
      } catch (error) {
        console.error("Erro ao buscar campos WFS:", error);
        setFormData({ ...formData, campos: "" });
      }
    };

    fetchFields();
  }, [formData.url, formData.service, formData.camadaGeoserver, formData.version]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === "filtros") {
      newValue = value.replace(/"/g, "%27"); 
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  const handleSubmit = () => {
    if (onSave) onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={styles.dialogTitle}>
        Adicionar Nova Camada
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.container}>
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Terras Indígenas - FUNAI"
            fullWidth
            size="small"
            sx={styles.field}
          />

          <TextField
            label="Nome da Fonte"
            name="nomeDaFonte"
            value={formData.nomeDaFonte}
            onChange={handleChange}
            placeholder="Ex: FUNAI, Semace"
            fullWidth
            size="small"
            sx={styles.field}
          />


          <FormControl fullWidth sx={styles.field}>
            <TextField
              select
              label="Tipo de Camada"
              name="tipoDeCamada"
              value={formData.tipoDeCamada}
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="Ponto">Ponto</MenuItem>
              <MenuItem value="Linha">Linha</MenuItem>
              <MenuItem value="Poligono">Polígono</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </TextField>
          </FormControl>

          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Ex: https://geoserver.funai.gov.br/geoserver/Funai/ows"
            fullWidth
            size="small"
            sx={styles.field}
          />

          <FormControl fullWidth sx={styles.field}>
            <TextField
              select
              label="Service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              size="small"
              placeholder="Ex: WFS"

            >
              {servicosAtivos.length > 0 ? (
                servicosAtivos.map((srv) => (
                  <MenuItem key={srv} value={srv}>
                    {srv}
                  </MenuItem>
                ))
              ) : (

                <MenuItem disabled value="">
                  Carregando...
                </MenuItem>

              )}
            </TextField>
          </FormControl>

          <FormControl fullWidth sx={styles.field}>
            <TextField
              select
              label="Nome da Camada no Geoserver"
              name="camadaGeoserver"
              value={formData.camadaGeoserver}
              onChange={handleChange}
              size="small"
              placeholder="Ex: Funai:tis_poligonais"

            >
              {camadas.length > 0 ? (
                camadas.map((camada) => (
                  <MenuItem key={camada.name} value={camada.name}>
                    {camada.name}
                  </MenuItem>
                ))
              ) : (

                <MenuItem disabled value="">
                  Carregando...
                </MenuItem>

              )}
            </TextField>
          </FormControl>

          <FormControl fullWidth sx={styles.field}>
            <TextField
              select
              label="Versão"
              name="version"
              value={formData.version}
              onChange={handleChange}
              size="small"
              placeholder="Ex: 1.0.0"

            >
              {versions.length > 0 ? (
                versions.map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))
              ) : (

                <MenuItem disabled value="">
                  Carregando...
                </MenuItem>

              )}
            </TextField>
          </FormControl>

          <TextField
            label="Formato Padrão"
            name="formatoPadrao"
            value={formData.formatoPadrao}
            onChange={handleChange}
            placeholder="Ex: application/json"
            fullWidth
            size="small"
            sx={styles.field}
          />


          <TextField
            label="Campos"
            name="campos"
            value={formData.campos}
            onChange={handleChange}
            placeholder="Ex: gid, terrai_nome, etnia_nome, municipio_nome,the_geom"
            fullWidth
            size="small"
            sx={styles.field}
          />

          <TextField
            label="Filtros"
            name="filtros"
            value={formData.filtros}
            onChange={handleChange}
            placeholder='Ex: uf_sigla="CE"'
            fullWidth
            size="small"
            sx={styles.field}
          />

          {/* ✅ Linha compacta: Ativo + Cor */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mt: 1,
              mb: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleChange}
                />
              }
              label="Ativo"
              sx={{ m: 0 }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Cor:
              </Typography>

              <TextField
                type="color"
                name="corCamada"
                value={formData.corCamada}
                onChange={handleChange}
                size="small"
                sx={{
                  width: 45,
                  height: 35,
                  padding: 0,
                  "& input": {
                    cursor: "pointer",
                    padding: 0,
                    height: 35,
                    width: 45,
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    background: "transparent",
                  },
                }}
              />

              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1px solid #aaa",
                  backgroundColor: formData.corCamada,
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button variant="outlined" onClick={onClose} sx={styles.btnCancelar}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          endIcon={<SaveIcon />}
          onClick={handleSubmit}
          sx={styles.btnSalvar}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
