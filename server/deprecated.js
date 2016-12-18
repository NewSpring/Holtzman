
import Future from "fibers/future";
import { Meteor } from "meteor/meteor";
// in order to support older app builds, we proxy the old meteor methods
// to the corresponding calls on Heighliner

import { GraphQL } from "../imports/graphql";
import COMPLETE_ORDER_MUTATION from "../imports/store/give/saga/completeOrderMutation";
import CREATE_ORDER_MUTATION from "../imports/store/give/saga/createOrderMutation";

import { CANCEL_SCHEDULE_QUERY } from "../imports/pages/give/schedules/Details";

// eslint-disable-next-line
export function order(formattedData, instant, id) {
  const f = new Future();

  GraphQL.mutate({
    mutation: CREATE_ORDER_MUTATION,
    variables: {
      data: JSON.stringify(formattedData),
      id,
      instant,
    },
  })
    .then(({ data }) => {
      if (data.response.error) {
        const error = new Meteor.Error(data.response.error);
        f.throw(error);
        return;
      }
      f.return(data.response);
    })
    .catch(f.throw);

  return f.wait();
}

Meteor.methods({
  "give/charge": function charge(token, name, id) {
    const f = new Future();

    GraphQL.mutate({
      mutation: COMPLETE_ORDER_MUTATION,
      variables: { token, name, id },
    })
      .then(({ data }) => {
        if (data.response.error) {
          const error = new Meteor.Error(data.response.error);
          f.throw(error);
          return;
        }
        f.return(data.response);
      })
      .catch(f.throw);

    return f.wait();
  },
  "give/order": order,
  "give/schedule": order,
  "give/schedule/cancel": function cancel({ id }) {
    const f = new Future();

    GraphQL.mutate({
      mutation: CANCEL_SCHEDULE_QUERY,
      variables: { id },
    })
      .then(({ data }) => {
        if (data.response.error) {
          const error = new Meteor.Error(data.response.error);
          f.throw(error);
          return;
        }
        f.return(data.response);
      })
      .catch(f.throw);

    return f.wait();
  },
});
