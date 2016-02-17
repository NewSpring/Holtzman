
import "regenerator/runtime"
import { take, put, cps } from "redux-saga/effects"
import { addSaga } from "../utilities"


addSaga(function* share(getStore) {

  while (true) {
    const { payload } = yield take("SHARE.SHARE")

    let { share } = getStore()

    if (typeof window != "undefined" && window != null && window.socialmessage) {
      let msg = {}

      for (let key in share.content) {
        if (share.content[key]) msg[key] = share.conent[key]
      }
      
      window.socialmessage.send(msg)
    }

    yield put({ type: "SHARE.SHARE" })

  }

})
