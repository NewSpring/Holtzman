
import "regenerator-runtime/runtime";
import { take, put, call, select } from "redux-saga/effects";

import { GraphQL } from "../../../graphql";

import types from "./../types";
import actions from "../actions";

import formatPersonDetails from "./formatPersonDetails";
import validate from "./validate";
import CREATE_ORDER_MUTATION from "./createOrderMutation";
import COMPLETE_ORDER_MUTATION from "./completeOrderMutation";
import SAVE_PAYMENT_MUTATION from "./savePaymentMutation";
import submitPersonDetails from "./submitPersonDetails";


// handle the transactions
export default function* chargeTransaction({ state }) {
  if (state !== "submit") return;

  let { give } = yield select();
  const name = give.data.payment.name;
  let error = false;
  let id;
  let saved = false;

  // set loading state
  yield put(actions.loading());
  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(give);

  // if you have a saved account, NMI lets you "order" a schedule
  // instead of order + charge
  if (formattedData.savedAccount && give.schedule.start) {
    saved = true;
  } else {
    let store = yield select();
    give = store.give;

    if (formattedData.savedAccount) {
      // set people data and store transaction id
      yield* submitPersonDetails(give, true);
    }

    store = yield select();
    give = store.give;

    // wait until we have the transaction url
    if (!give.url) {
      const { url } = yield take(types.SET_TRANSACTION_DETAILS);
      give.url = url;
    }
  }

  // get the token and name of the saved account
  const token = give.url.split("/").pop();

  // if there is not a saved account, validate the payment
  if (!formattedData.savedAccount) {
    if (give.data.payment.type === "cc") {
      // saved accounts don't validate the payment by default
      // so we make 3 blocking requests to validate the card :(
      const { validationError } = yield* validate();

      if (validationError) {
        error = validationError;
      }
    }
  }

  if (give.scheduleToRecover && give.schedule.start) {
    id = give.scheduleToRecover;
  }

  if (give.userId) id = give.userId; // used in native => web payments

  if (!error) {
    // submit transaction
    try {
      let data = {};
      if (!saved) {
        if (give.transactionType === "savedPayment") {
          // only save the payment info. Don't process it.
          data = yield call(GraphQL.mutate, {
            mutation: SAVE_PAYMENT_MUTATION,
            variables: { token, name, id },
            updateQueries: {
              GivingDashboard: (prev, { mutationResult }) => {
                if (!mutationResult.data) return prev;
                const { savedPayment, success } = mutationResult.data.response;
                if (!success || !savedPayment) return prev;
                prev.savedPayments.push(savedPayment);
                return prev;
              },
              GetSavedPaymentAccounts: (prev, { mutationResult }) => {
                if (!mutationResult.data) return prev;
                const { savedPayment, success } = mutationResult.data.response;
                if (!success || !savedPayment) return prev;
                prev.savedPayments.push(savedPayment);
                return prev;
              },
            },
          });
        } else {
          // XXX update data if returned
          data = yield call(GraphQL.mutate, {
            mutation: COMPLETE_ORDER_MUTATION,
            variables: { token, name, id },
          });
        }
      } else {
        data = yield call(GraphQL.mutate, {
          mutation: CREATE_ORDER_MUTATION,
          variables: { data: JSON.stringify(formattedData), instant: true, id },
        });
      }
      if (data && data.data && data.data.response) data = data.data.response;
      if (data && data.error) error = data.error;
    } catch (e) { error = e; }
  }

  // set error states
  if (error) {
    yield put(actions.error({ transaction: error }));

    // remove loading state
    yield put(actions.setState("error"));
  } else {
    // remove loading state
    yield put(actions.setState("success"));

    if (typeof ga !== "undefined") {
      const txns = {
        id: `${give.url.split("/").pop()}`,
        affiliation: "NewSpring Church",
        revenue: `${give.total}`,
      };
      ga("ecommerce:addTransaction", txns);

      if (Object.keys(give.transactions)) {
        // eslint-disable-next-line
        for (const item in give.transactions) {
          const itemData = {
            id: item,
            name: give.transactions[item].label,
            price: `${give.transactions[item].value}`,
          };
          ga("ecommerce:addItem", itemData);
        }
      }
      ga("ecommerce:send");
    }

    // if we activated an inactive schedule, remove it
    if (give.scheduleToRecover && give.recoverableSchedules[give.scheduleToRecover]) {
      yield put(actions.deleteSchedule(give.scheduleToRecover));
      yield put(actions.deleteRecoverableSchedules(give.scheduleToRecover));
    }
  }
}
