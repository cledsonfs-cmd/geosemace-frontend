import { ShapeState } from "./interfaces";
import { 
  SHAPE_SEARCH_REQUEST, 
  SHAPE_SEARCH_SUCCESS, 
  SHAPE_SEARCH_FAILURE,

  SHAPE_REQUEST, 
  SHAPE_SUCCESS, 
  SHAPE_FAILURE
 } from "./types";

const initialState: ShapeState = {
  shape: null,
  shapes: [],
  loading: false,
  error: null,

  filtro: null,
  totalRegistros: 0,
};

export default function shapesReducer(state = initialState, action: any): ShapeState {
  
  switch (action.type) {
    case SHAPE_REQUEST:
      return { ...state, loading: true, error: null };
    case SHAPE_SUCCESS:
      return { ...state, loading: false, shape: action.payload };
    case SHAPE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SHAPE_SEARCH_REQUEST:
      return { ...state, loading: true, error: null, totalRegistros: undefined };
    case SHAPE_SEARCH_SUCCESS:
      return { ...state, loading: false, shapes: action.payload, totalRegistros: action.payload.length };
    case SHAPE_SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
