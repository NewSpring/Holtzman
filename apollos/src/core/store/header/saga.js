import { takeLatest } from "redux-saga";
import { fork, put, cps, select } from "redux-saga/effects"
import { addSaga } from "../utilities"

const canRun = () => {
  return typeof window !== "undefined" && window !== null && typeof window.StatusBar !== "undefined";
};

function* toggleHeader() {
  let { header } = yield select()
  if (canRun()) {
    if (!header.statusBar) StatusBar.hide()
    if (header.statusBar) StatusBar.show()
  }
};

function* setColor({ color }) {
  if (canRun() && color) StatusBar.backgroundColorByHexString(color);
};

function* setColorFromHeader() {
  let { header } = yield select()
  if (canRun() && header.content.color) {
    StatusBar.backgroundColorByHexString(header.content.color);
  }
};

addSaga(function* headerSaga() {
  yield fork(takeLatest, "HEADER.TOGGLE_VISIBILITY", toggleHeader);
  yield fork(takeLatest, "STATUSBAR.SET", setColor);
  yield fork(takeLatest, "HEADER.SET", setColorFromHeader)
})
