export interface CamadaState {
  camada: Camada | null;
  camadas: Camada[] | [];
  loading: boolean;
  error: string | null;
  
  totais: Totais | null;
}

export interface Camada {
  id: number | null;
  nome: string | null;
  url: string | null;
  tipoDeCamada: string | null;
  nomeDaFonte: string | null;
  camadaGeoserver: string | null;
  formatoPadrao: string | null;
  campos: string | null;
  filtros: string | null;
  ativo: boolean | null;
  criadoEm: Date | null;
  atualizadoEm: Date | null;
  version?: string | null;
  service?: string | null;
  corCamada: string | null;
}

export interface Totais {
  fontes: number;
  tipos: number;  
}


