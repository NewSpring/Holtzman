import "regenerator-runtime/runtime";
import { takeLatest, fork, select } from "redux-saga/effects";
import { addSaga } from "../utilities";

// eslint-disable-next-line
export function* shareAction() {
  const { share } = yield select();
  const msg = {};

  // eslint-disable-next-line
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

export default function* shareSaga() {
  yield fork(takeLatest, "SHARE.SHARE", shareAction);
}

addSaga(shareSaga);
