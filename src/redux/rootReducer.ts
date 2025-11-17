import { combineReducers } from "redux";
import authReducer from "./modules/auth/reducer";
import camadaReducer from "./modules/camada/reducer";
import shapeReducer from "./modules/shape/reducer";
import toastReducer from "./modules/toast/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  camada: camadaReducer,
  shape: shapeReducer,
  toast: toastReducer,
});

export default rootReducer;
