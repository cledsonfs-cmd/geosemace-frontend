export interface ShapeState {
  shape: Shape | null;
  shapes: Shape[] | [];
  loading: boolean;
  error: string | null;

  filtro: FiltroShape | null;

  totalRegistros?: number;
}

export interface Shape{    
  id: string | null;  
  //fiscalização / licenciamento     
  tipo: string;
  spu: string;
  doc: string;
  cnpjcpf: string;
  municipio: string;
  geojson: string;

  //fiscalização
  fiscalizacaoTipoDoc: string;
  fiscalizacaoAutuado: string;

  //licenciamento
  nome: string;
  tipoZona: string;
  tipoProcesso: string;
  atividade: string;
  situacao: string;
  dataEmissao: Date;
  dataAberturaProcesso: Date;
}

export interface FiltroShape{
  tipo: string;
  valor: string;
}

