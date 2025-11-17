import { 
  SHAPE_SEARCH_REQUEST, 
  SHAPE_SEARCH_SUCCESS, 
  SHAPE_SEARCH_FAILURE,

  SHAPE_REQUEST, 
  SHAPE_SUCCESS, 
  SHAPE_FAILURE
 } from "./types";

// ------------------------------ SHAPE ---------------------------------
export const shapeRequest = (id: any) => ({
  type: SHAPE_REQUEST,
  payload: { id },
});

export const shapeSuccess = (data: [{}]) => ({
  type: SHAPE_SUCCESS,
  payload: data,
});

export const shapeFailure = (error: string) => ({
  type: SHAPE_FAILURE,
  payload: error,
});


// ------------------------------ SEARCH SHAPE ---------------------------------
export const shapeSearchRequest = (filtros: {}) => ({
  type: SHAPE_SEARCH_REQUEST,
  payload: { filtros },
});

export const shapeSearchSuccess = (data: [{}]) => ({
  type: SHAPE_SEARCH_SUCCESS,
  payload: data,
});

export const shapeSearchFailure = (error: string) => ({
  type: SHAPE_SEARCH_FAILURE,
  payload: error,
});
