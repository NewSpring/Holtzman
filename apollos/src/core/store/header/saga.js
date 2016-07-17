import { takeLatest } from "redux-saga";
import { fork, put, cps, select } from "redux-saga/effects"
import { addSaga } from "../utilities"

const canRun = (
  typeof window !== "undefined" && window !== null && window.StatusBar !== "undefined"
);

function* toggleHeader() {
  console.log("toggleHeader");
  let { header } = yield select()
  console.log(header);
  console.log(header.statusBar);
  if (canRun) {
    console.log("toggleHeader can run");
    if (!header.statusBar) StatusBar.hide()
    if (header.statusBar) StatusBar.show()
  }
};

function* setColor({ color }) {
  console.log("setColor", color);
  if (canRun && color) StatusBar.backgroundColorByHexString(color);
};

function* setColorFromHeader() {
  console.log("setColorFromHeader");
  let { header } = yield select()
  console.log(header);
  console.log(header.content.color);
  console.log(canRun);
  if (canRun && header.content.color) {
    console.log("setColorFromHeader can run");
    console.log(header);
    console.log(header.content.color);
    StatusBar.backgroundColorByHexString(header.content.color);
  }
};

addSaga(function* headerSaga() {
  yield fork(takeLatest, "HEADER.TOGGLE_VISIBILITY", toggleHeader);
  yield fork(takeLatest, "STATUSBAR.SET", setColor);
  yield fork(takeLatest, "HEADER.SET", setColorFromHeader)
})
