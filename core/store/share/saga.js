
import "regenerator/runtime"
import { take, put, cps } from "redux-saga/effects"
import { addSaga } from "../utilities"


addSaga(function* share(getStore) {

  while (true) {
    const { payload } = yield take("SHARE.SHARE")

    let { share } = getStore()
    let msg = {}

    for (let key in share.content) {
      if (share.content[key] != null ) {
        msg[key] = share.content[key]
      }

    }

    if (
      typeof window != "undefined" &&
      window != null &&
      window.socialmessage &&
      Object.keys(msg).length
    ) {

      if (msg.image && msg.image[0] === "/") {
        msg.image = "http:" + msg.image
      }

      if (msg.url) {
        msg.text = `${msg.text}\n${msg.url}`
      }

      window.socialmessage.send(msg)
    }

    yield put({ type: "SHARE.SHARE" })

  }

})
