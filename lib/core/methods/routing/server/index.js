"use strict";

var _rock = require("../../../util/rock");

var _collections = require("../../../collections");

var _guid = require("../../../util/guid");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global Meteor, check */


Meteor.methods({
  "rock/routes/log": function rockRoutesLog(path, title) {
    check(path, String);
    check(title, String);

    var user = this.userId;
    if (!user) {
      return;
    }

    var session = _collections.Sessions.findOne({ userId: this.userId }, {
      sort: {
        updatedAt: -1
      }
    });

    if (!session) {
      return;
    }

    var ip = session.ip;
    var _id = session._id;


    var Session = {
      SessionId: (0, _guid.makeNewGuid)(),
      IpAddress: ip,
      Guid: (0, _guid.makeNewGuid)(),
      ForeignKey: _id
    };

    // this may not be possible yet :(
    return;

    var PageViewSessionId = _rock.api.get.sync("PageViewSessions?$filter=ForeignKey eq '" + _id + "'");

    if (PageViewSessionId.statusText || !PageViewSessionId.length) {
      PageViewSessionId = _rock.api.post.sync("PageViewSessions", Session);
    } else {
      PageViewSessionId = PageViewSessionId[0].Id;
    }

    console.log(PageViewSessionId);

    user = Meteor.users.findOne(user);
    user || (user = { services: { rock: {} } });

    var PrimaryAliasId = user.services.rock.PrimaryAliasId;


    if (PrimaryAliasId) {
      var PageView = {
        PageViewSessionId: PageViewSessionId,
        SiteId: _rock.api._.siteId,
        PersonAliasId: PrimaryAliasId,
        DateTimeViewed: "" + (0, _moment2["default"])().toISOString(),
        Url: path,
        PageTitle: title,
        Guid: (0, _guid.makeNewGuid)()
      };

      console.log(PageView);

      // api.post("PageViews", PageView, (err, data) => {
      //   console.log(err, data)
      // })
    }

    return;
  }
});