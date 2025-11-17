import { CamadaState } from "./interfaces";
import {   
  CAMADAS_TOTAL_REQUEST, 
  CAMADAS_TOTAL_SUCCESS, 
  CAMADAS_TOTAL_FAILURE,

  CAMADAS_REQUEST, 
  CAMADAS_SUCCESS, 
  CAMADAS_FAILURE ,

  CAMADA_REQUEST, 
  CAMADA_SUCCESS, 
  CAMADA_FAILURE ,

  CAMADAS_ATIVAS_REQUEST, 
  CAMADAS_ATIVAS_SUCCESS, 
  CAMADAS_ATIVAS_FAILURE ,
  
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

const initialState: CamadaState = {
  camada: null,
  camadas: [],
  loading: false,
  error: null,  

  totais: null,
};

export default function camadaReducer(state = initialState, action: any): CamadaState {
  
  switch (action.type) {
// ------------------------------ CAMADAS TOTAL ---------------------------------      
    case CAMADAS_TOTAL_REQUEST:
      return { ...state, loading: true, error: null };
    case CAMADAS_TOTAL_SUCCESS:
      return { ...state, loading: false, totais: action.payload };
    case CAMADAS_TOTAL_FAILURE:
      return { ...state, loading: false, error: action.payload }; 

// ------------------------------ CAMADA ---------------------------------      
     case CAMADA_REQUEST:
      return { ...state, loading: true, error: null };
    case CAMADA_SUCCESS:
      return { ...state, loading: false, camada: action.payload };
    case CAMADA_FAILURE:
      return { ...state, loading: false, error: action.payload };

// ------------------------------ LISTA CAMADA ---------------------------------      
     case CAMADAS_REQUEST:
      return { ...state, loading: true, error: null };
    case CAMADAS_SUCCESS:
      return { ...state, loading: false, camadas: action.payload };
    case CAMADAS_FAILURE:
      return { ...state, loading: false, error: action.payload };

// ------------------------------ LISTA CAMADA ---------------------------------      
     case CAMADAS_ATIVAS_REQUEST:
      return { ...state, loading: true, error: null };
    case CAMADAS_ATIVAS_SUCCESS:
      return { ...state, loading: false, camadas: action.payload };
    case CAMADAS_ATIVAS_FAILURE:
      return { ...state, loading: false, error: action.payload };

// ------------------------------ SALVAR CAMADA ---------------------------------      
     case SALVAR_CAMADA_REQUEST:
      return { ...state, loading: true, error: null };
    case SALVAR_CAMADA_SUCCESS:
      return { ...state, loading: false, camadas: action.payload };
    case SALVAR_CAMADA_FAILURE:
      return { ...state, loading: false, error: action.payload };

// ------------------------------ EXCLUIR CAMADA ---------------------------------      
     case EXCLUIR_CAMADA_REQUEST:
      return { ...state, loading: true, error: null };
    case EXCLUIR_CAMADA_SUCCESS:
      return { ...state, loading: false, camadas: action.payload };
    case EXCLUIR_CAMADA_FAILURE:
      return { ...state, loading: false, error: action.payload };      

// ------------------------------ UPDATE CAMADA ---------------------------------      
     case UPDATE_CAMADA_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CAMADA_SUCCESS:
      return { ...state, loading: false, camadas: action.payload };
    case UPDATE_CAMADA_FAILURE:
      return { ...state, loading: false, error: action.payload };  

    default:
      return state;
  }
}
