
import "regenerator-runtime/runtime"
import { take, put, cps } from "redux-saga/effects"

import { addSaga } from "../../../core/store/utilities"

addSaga(function* scrollToTop(getStore) {

  // while (true) {
  //
  //   const { payload } = yield take("@@router/UPDATE_LOCATION")
  //
  //   if (payload.action === "PUSH") {
  //     window.scrollTo(0, 0)
  //   }
  //
  // }

})
