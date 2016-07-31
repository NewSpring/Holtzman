
import "regenerator-runtime/runtime"
import { takeLatest } from "redux-saga";
import { fork, put, cps } from "redux-saga/effects"

// import { routing as log } from "../../methods"
import { addSaga } from "../utilities"

// addSaga(function* logInitRoute() {
//
//   let user = Meteor.userId()
//
//   if (user) {
//     if (typeof window != "undefined" && window != null) {
//       let title = window.document.title,
//         url = window.location.href
//
//       // log(url, title)
//     }
//   }
//
//   const { payload } = yield take("@@router/UPDATE_LOCATION")
//
// })
//
// addSaga(function* logRoutes(getStore) {
//
//   // setup this saga to always be listening for actions
//   while (true) {
//
//     let user = Meteor.userId();
//     const { payload } = yield take("@@router/UPDATE_LOCATION")
//
//     if (Meteor.userId()) {
//
//
//       if (typeof window != "undefined" && window != null) {
//         let title = window.document.title,
//           url = window.location.href
//
//         // log(url, title)
//       }
//     }
//
//
//   }
//
// })
