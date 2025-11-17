import { call, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./actions";
import { AUTH_REQUEST } from "./types";
import api from "@/api/axiosConfig";

function* loginSaga(action: any): any {
  try {        
    const response = yield call(api.get, "/authorization");
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(AUTH_REQUEST, loginSaga);
}
