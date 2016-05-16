import { take, put, cps } from "redux-saga/effects"

import log from "../../methods/routing/client"
import { addSaga } from "../utilities"

addSaga(function* logInitRoute() {

  let user = Meteor.userId()

  if (user) {
    if (typeof window != "undefined" && window != null) {
      let title = window.document.title,
        url = window.location.href

      log(url, title)
    }
  }

  const { payload } = yield take("@@router/UPDATE_LOCATION")

})

addSaga(function* scrollToTop(getStore) {

  while (true) {

    const { payload } = yield take("@@router/UPDATE_LOCATION")

    if (payload.action === "PUSH") {
      window.scrollTo(0, 0)
    }

  }

})


addSaga(function* logRoutes(getStore) {

  // setup this saga to always be listening for actions
  while (true) {

    let user = Meteor.userId();
    const { payload } = yield take("@@router/UPDATE_LOCATION")

    if (Meteor.userId()) {


      if (typeof window != "undefined" && window != null) {
        let title = window.document.title,
          url = window.location.href

        log(url, title)
      }
    }


  }

})
