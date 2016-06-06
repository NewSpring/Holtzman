import "regenerator-runtime"
import { take, put, cps } from "redux-saga/effects"
import { addSaga } from "apollos/core/store/utilities"

addSaga(function* share(getStore) {

  while (true) {
    const { payload } = yield take("HEADER.SET")

    let { header } = getStore()

    if (
      typeof window != "undefined" &&
      window != null &&
      window.StatusBar
    ) {

      if (header.content.color) {
        StatusBar.backgroundColorByHexString(header.content.color)
      }
    }
  }
});

addSaga(function* share(getStore) {

  while (true) {
    const { payload } = yield take("HEADER.TOGGLE_VISIBILITY")
    let { header } = getStore()
    if (
      typeof window != "undefined" &&
      window != null &&
      window.StatusBar
    ) {

      console.log(header)
      if (!header.visible) {
        StatusBar.hide()
      }

      if (header.visible) {
        StatusBar.show()
      }
    }
  }
});
