import { 
  CAMADAS_TOTAL_REQUEST,
  CAMADAS_TOTAL_SUCCESS,
  CAMADAS_TOTAL_FAILURE,  

  CAMADAS_REQUEST, 
  CAMADAS_SUCCESS, 
  CAMADAS_FAILURE,
  
  CAMADA_REQUEST, 
  CAMADA_SUCCESS, 
  CAMADA_FAILURE,

  CAMADAS_ATIVAS_REQUEST, 
  CAMADAS_ATIVAS_SUCCESS, 
  CAMADAS_ATIVAS_FAILURE,

  SALVAR_CAMADA_REQUEST, 
  SALVAR_CAMADA_SUCCESS, 
  SALVAR_CAMADA_FAILURE,

  EXCLUIR_CAMADA_REQUEST, 
  EXCLUIR_CAMADA_SUCCESS, 
  EXCLUIR_CAMADA_FAILURE,

  UPDATE_CAMADA_REQUEST, 
  UPDATE_CAMADA_SUCCESS, 
  UPDATE_CAMADA_FAILURE
} from "./types";

// ----------------------------------- CAMADAS TOTAL ----------------------------------
export const camadasTotalRequest = () => ({
  type: CAMADAS_TOTAL_REQUEST,
  payload: { },
});

export const camadasTotalSuccess = (data: number) => ({
  type: CAMADAS_TOTAL_SUCCESS,
  payload: data,
});

export const camadasTotalFailure = (error: string) => ({
  type: CAMADAS_TOTAL_FAILURE,
  payload: error,
});

// ----------------------------------- CAMADA ----------------------------------
export const camadaRequest = (id: any) => ({
  type: CAMADA_REQUEST,
  payload: { id },
});

export const camadaSuccess = (data: [{}]) => ({
  type: CAMADA_SUCCESS,
  payload: data,
});

export const camadaFailure = (error: string) => ({
  type: CAMADAS_FAILURE,
  payload: error,
});

// ----------------------------------- LISTAR CAMADA ----------------------------------
export const camadasRequest = () => ({
  type: CAMADAS_REQUEST,
  payload: { },
});

export const camadasSuccess = (data: [{}]) => ({
  type: CAMADAS_SUCCESS,
  payload: data,
});

export const camadasFailure = (error: string) => ({
  type: CAMADAS_FAILURE,
  payload: error,
});

// ----------------------------------- LISTAR CAMADA ----------------------------------
export const camadasAtivasRequest = () => ({
  type: CAMADAS_ATIVAS_REQUEST,
  payload: { },
});

export const camadasAtivasSuccess = (data: [{}]) => ({
  type: CAMADAS_ATIVAS_SUCCESS,
  payload: data,
});

export const camadasAtivasFailure = (error: string) => ({
  type: CAMADAS_ATIVAS_FAILURE,
  payload: error,
});

// ----------------------------------- SALVAR CAMADA ----------------------------------
export const savarCamadaRequest = (dados: any[]) => ({
  type: SALVAR_CAMADA_REQUEST,
  payload: { dados },
});

export const savarCamadaSuccess = (data: [{}]) => ({
  type: SALVAR_CAMADA_SUCCESS,
  payload: data,
});

export const savarCamadaFailure = (error: string) => ({
  type: SALVAR_CAMADA_FAILURE,
  payload: error,
});

// ----------------------------------- EXCLUIR CAMADA ----------------------------------
export const excluirCamadaRequest = (id: number) => ({
  type: EXCLUIR_CAMADA_REQUEST,
  payload: { id },
});

export const excluirCamadaSuccess = (data: [{}]) => ({
  type: EXCLUIR_CAMADA_SUCCESS,
  payload: data,
});

export const excluirCamadaFailure = (error: string) => ({
  type: EXCLUIR_CAMADA_FAILURE,
  payload: error,
});

// ----------------------------------- UPDATE CAMADA ----------------------------------
export const updateCamadaRequest = (id: number) => ({
  type: UPDATE_CAMADA_REQUEST,
  payload: { id },
});

export const updateCamadaSuccess = (data: [{}]) => ({
  type: UPDATE_CAMADA_SUCCESS,
  payload: data,
});

export const updateCamadaFailure = (error: string) => ({
  type: UPDATE_CAMADA_FAILURE,
  payload: error,
});
