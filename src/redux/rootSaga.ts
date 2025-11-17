import { all, fork } from "redux-saga/effects";
import authSaga from "./modules/auth/saga";
import camadaSaga from "./modules/camada/saga";
import shapeSage from "./modules/shape/saga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(camadaSaga),
    fork(shapeSage),
  ]);
}
