"use strict";

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _rock = require("../../../../core/util/rock");

var _nmi = require("./nmi");

var _createSchedule = require("./createSchedule");

var _createSchedule2 = _interopRequireDefault(_createSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  During the transition from F1 to Rock, we have schedules that need
  to be recovered from our imported data

  The criteria for a `recoverable schedule` is the following:
    IsActive (active: false on GQL query) === false
    GatewayCode (gateway on GQL) === null

  When the schedule is reactivated, the GatewayCode is set and it is set back
  to active.

  If the schedule is canceled permantly, and it doesn't have a GatewayCode,
  it is safe to delete it as no auditable information exists.


  Created schedules can be recovered schedules, or new ones entirely.
  If we are recovering a schedule, an id will be passed along with the call.
  We recover by taking the existing schedule, and performing a PATCH with the
  new details, GatewayCode, and IsActive: true. The workflow in Rock for a
  F1 recovered is based off the trigger from GatewayCode null -> value.

  New schedules are created using a POST and the workflow trigger is based off

  ```
  F1 Schedules:
  - Schedule recovered: GatewayCode != previous GatewayCode (alert finance to cancel in F1)
  - Schedule (from F1) canceled: DELETE (alert finance to cancel in F1)

  Rock/Apollos Schedules:
  - Schedule created: generic new record (:partyparrot:)
  - Schedule canceled: IsActive === false (:frowning:)
  ```

*/

/*global Meteor */

Meteor.methods({
  "give/schedule": function giveSchedule(token, accountName, id) {
    var user = null;
    if (this.userId) {
      user = Meteor.users.findOne({ _id: this.userId });
    }

    var response = {};
    try {
      response = Meteor.wrapAsync(_nmi.charge)(token);
      response = (0, _createSchedule2["default"])(response, accountName, id, user);
    } catch (e) {
      throw new Meteor.Error(e.message);
    }

    return response;
  }
});

var cancel = function cancel(_ref) {
  var id = _ref.id;
  var gateway = _ref.gateway;

  var response = {};

  var existing = _rock.api.get.sync("FinancialScheduledTransactions/" + id);

  // only remove if this is an NMI transaction and we have a gateway code
  if (gateway && existing.FinancialGatewayId === _rock.api._.give.gateway.id) {
    try {
      response = Meteor.wrapAsync(_nmi.cancel)(gateway);
    } catch (e) {
      throw new Meteor.Error(e.message ? e.message : e);
    }
  }

  // created via Rock / NMI / Apollos
  if (existing.GatewayScheduleId) {
    response = _rock.api.patch.sync("FinancialScheduledTransactions/" + id, { IsActive: false });
    // debug for now
    console.log("@@REMOVE_SCHEDULE_DATA", response, id, gateway, existing);
  } else {
    // infellowhsip move over
    response = _rock.api["delete"].sync("FinancialScheduledTransactions/" + id);
  }

  if (response.statusText) {
    console.error("@@REMOVE_SCHEDULE_ERROR", response, id, existing);
    throw new Meteor.Error(response);
  }

  return true;
};

Meteor.methods({ "give/schedule/cancel": cancel });