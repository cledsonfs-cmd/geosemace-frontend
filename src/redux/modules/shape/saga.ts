import { call, put, takeLatest, all } from "redux-saga/effects";
import { 
  shapeSearchFailure,
  shapeSearchSuccess } from "./actions";
import { 
  SHAPE_SEARCH_REQUEST,
  SHAPE_REQUEST
 } from "./types";
import api from "@/api/axiosConfig";
import { showToast } from "../toast/actions";

function* getShapeSaga(action: any): any {
  try {        
    const { id } = action.payload;
    const response = yield call(api.get, "/shapes/"+id);    
    yield put(shapeSearchSuccess(response.data.dados));
    
    if(response.data.mensagemConexao){
      yield put(showToast(response.data.mensagemConexao, "warning"));
    }
    
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao buscar shape.";    
    yield put(showToast(errorMessage, "error"));
    yield put(shapeSearchFailure(errorMessage));
  }
}

function* getShapeSearchSaga(action: any): any {
  try {        
    const { filtros } = action.payload;
    const response = yield call(api.post, "/shapes/filtro", filtros);

    if(response.data.mensagemConexao){
      yield put(showToast(response.data.mensagemConexao, "warning"));
    }
    
    yield put(shapeSearchSuccess(response.data.dados));
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro ao localizar shape(s).";
    yield put(showToast(errorMessage, "error"));
    yield put(shapeSearchFailure(errorMessage));
  }
}

export default function* baseCartograficaSagaSaga() {
      yield all([
        takeLatest(SHAPE_REQUEST, getShapeSaga),        
        takeLatest(SHAPE_SEARCH_REQUEST, getShapeSearchSaga),        
      ]);
  
}
