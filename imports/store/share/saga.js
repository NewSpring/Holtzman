
import "regenerator-runtime/runtime";
import { takeLatest } from "redux-saga";
import { fork, select } from "redux-saga/effects";
import { addSaga } from "../utilities";


function* shareAction() {
  const { share } = yield select();
  const msg = {};

  for (const key in share.content) {
    if (share.content[key] != null) {
      msg[key] = share.content[key];
    }
  }

  // this is a temporary speed bump
  if (msg.image) delete msg.image;

  if (
    typeof window !== "undefined" &&
    window != null &&
    window.socialmessage &&
    Object.keys(msg).length
  ) {
    if (msg.image && msg.image[0] === "/") {
      msg.image = `http:${msg.image}`;
    }

    window.socialmessage.send(msg);
  }
}

addSaga(function* shareSaga() {
  yield fork(takeLatest, "SHARE.SHARE", shareAction);
});
