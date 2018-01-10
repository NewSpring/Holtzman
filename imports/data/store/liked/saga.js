/* eslint-disable import/no-named-as-default-member */
import "regenerator-runtime/runtime";
import { takeEvery, fork, put } from "redux-saga/effects";

import { addSaga } from "../utilities";

import actions from "./";

function* signout({ state }) {
  if (state !== "signout") return;
  yield put(actions.set([]));
}

addSaga(function* likedSaga() {
  yield fork(takeEvery, "ACCOUNTS.SET_STATE", signout);
});
