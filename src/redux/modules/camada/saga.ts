import { call, put, takeLatest, all  } from "redux-saga/effects";
import { 
  camadaSuccess, 
  camadaFailure, 
  camadasSuccess, 
  camadasFailure, 
  camadasTotalSuccess, 
  camadasTotalFailure,
  savarCamadaSuccess, 
  savarCamadaFailure,
  excluirCamadaSuccess,
  excluirCamadaFailure, 
  camadasRequest,
  updateCamadaSuccess,
  updateCamadaFailure,
  camadasAtivasSuccess,
  camadasAtivasFailure
} from "./actions";
import { 
  CAMADA_REQUEST, 
  CAMADAS_REQUEST, 
  CAMADAS_TOTAL_REQUEST, 
  SALVAR_CAMADA_REQUEST ,
  EXCLUIR_CAMADA_REQUEST,
  UPDATE_CAMADA_REQUEST,
  CAMADAS_ATIVAS_REQUEST
} from "./types";

import api from "@/api/axiosConfig";
import { showToast } from "../toast/actions";

function* getCamadaSaga(action: any): any {
  try {            
    const { id } = action.payload;
    const response = yield call(api.get, "/camadas/"+id);         
    yield put(camadaSuccess(response.data));
  } catch (error: any) {
    yield put(camadaFailure(error.message));
  }
}

function* getCamadasSaga(action: any): any {
  try {            
    const response = yield call(api.get, "/camadas");         
    yield put(camadasSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao buscar camadas.";
    yield put(camadasFailure(errorMessage));
    yield put(showToast(errorMessage, "error"));
  }
}

function* getCamadasAtivasSaga(action: any): any {
  try {            
    const response = yield call(api.get, "/camadas/ativas");         
    yield put(camadasAtivasSuccess(response.data));
  } catch (error: any) {    
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao buscar camadas ativas.";
    yield put(showToast(errorMessage, "error"));
    yield put(camadasAtivasFailure(errorMessage));
  }
}
function* getCamadasTotalSaga(action: any): any {
  try {        
    const response = yield call(api.get, "/camadas/totais");    
    yield put(camadasTotalSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao buscar total camadas.";
    yield put(showToast(errorMessage, "error"));
    yield put(camadasTotalFailure(errorMessage));
  }
}

function* salvarCamadaSaga(action: any): any {
  try {            
    const { dados } = action.payload;
    const response = yield call(api.post, "/camadas", dados);    

    yield put(savarCamadaSuccess(response.data));
    
     yield put(camadasRequest());
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao salvar camada.";
    yield put(showToast(errorMessage, "error"));
    yield put(savarCamadaFailure(errorMessage));
  }
}

function* excluirCamadaSaga(action: any): any {
  try {            
    const { id } = action.payload;
    const response = yield call(api.delete, "/camadas/"+ id);        

    yield put(excluirCamadaSuccess(response.data));

    yield put(camadasRequest());

  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao excluir camada.";
    yield put(showToast(errorMessage, "error"));
    yield put(excluirCamadaFailure(errorMessage));
  }
}

function* updateCamadaSaga(action: any): any {
  try {            
    const { dados } = action.payload;
    const response = yield call(api.put, "/camadas", dados);    

    yield put(updateCamadaSuccess(response.data));
    
     yield put(camadasRequest());
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao atualizar camada.";
    yield put(showToast(errorMessage, "error"));
    yield put(updateCamadaFailure(errorMessage));
  }
}

export default function* camadaSaga() {  
    yield all([      
      takeLatest(CAMADA_REQUEST, getCamadaSaga),      
      takeLatest(CAMADAS_REQUEST, getCamadasSaga),      
      takeLatest(CAMADAS_TOTAL_REQUEST, getCamadasTotalSaga),
      takeLatest(SALVAR_CAMADA_REQUEST, salvarCamadaSaga),
      takeLatest(EXCLUIR_CAMADA_REQUEST, excluirCamadaSaga),
      takeLatest(UPDATE_CAMADA_REQUEST, updateCamadaSaga),
      takeLatest(CAMADAS_ATIVAS_REQUEST, getCamadasAtivasSaga),
    ]);
}
