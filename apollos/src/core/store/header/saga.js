import { takeLatest } from "redux-saga";
import { fork, put, cps, select } from "redux-saga/effects"
import { addSaga } from "../utilities"

const canRun = (
  typeof window !== "undefined" && window !== null && window.StatusBar
);

function* toogleHeader() {
  let { header } = select()
  if (canRun) {
    if (!header.statusBar) StatusBar.hide()
    if (header.statusBar) StatusBar.show()
  }
};

function* setColor({ color}) {
  if (canRun && color) StatusBar.backgroundColorByHexString(color);
};

function* toogleHeader() {
  let { header } = select()
  if (canRun && header.content.color) {
    StatusBar.backgroundColorByHexString(header.content.color);
  }
};

addSaga(function* headerSaga() {
  yield fork(takeLatest, "HEADER.TOGGLE_VISIBILITY", toogleHeader);
  yield fork(takeLatest, "STATUSBAR.SET", setColor);
  yield fork(takeLatest, "HEADER.SET", setColor)
})
