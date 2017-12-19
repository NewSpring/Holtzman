import "regenerator-runtime/runtime";
import { takeLatest, fork, select } from "redux-saga/effects";
import { addSaga } from "../utilities";

const canRun = () => (
  typeof window !== "undefined" && window !== null && typeof window.StatusBar !== "undefined"
);

function* toggleHeader() {
  const { header } = yield select();
  if (canRun()) {
    if (!header.statusBar) StatusBar.hide();
    if (header.statusBar) StatusBar.show();
  }
}

function setColor({ color }) {
  if (canRun() && color) StatusBar.backgroundColorByHexString(color);
}

function* setColorFromHeader() {
  const { header } = yield select();
  if (canRun()) {
    if (header.content.color) {
      StatusBar.backgroundColorByHexString(header.content.color);
    }
    if (header.content.light) {
      StatusBar.styleLightContent();
    } else {
      StatusBar.styleDefault();
    }
  }
}

addSaga(function* headerSaga() {
  yield fork(takeLatest, "HEADER.TOGGLE_VISIBILITY", toggleHeader);
  yield fork(takeLatest, "STATUSBAR.SET", setColor);
  yield fork(takeLatest, "HEADER.SET", setColorFromHeader);
});
