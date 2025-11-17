export type LayerId = "";

export type CheckedMap = Record<LayerId, boolean>;

export type LayerSummary = {
  id: LayerId;
  nome: string;
  tipo: string;
  base: string;
  qtd?: number;
};