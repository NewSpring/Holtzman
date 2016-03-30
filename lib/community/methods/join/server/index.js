"use strict";

var _rock = require("../../../../core/util/rock");

var _guid = require("../../../../core/util/guid");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GROUP_MEMBER_REQUEST_EMAIL = false,
    EMAIL_EXISTS = true; /*global Meteor, check */


Meteor.methods({
  "community/actions/join": function communityActionsJoin(GroupId, message) {

    if (!this.userId) {
      throw new Meteor.Error("You must be signed in to join a group");
    }

    var user = Meteor.users.findOne({ _id: this.userId });
    console.log(user);

    if (!user || !user.services || !user.services.rock || !user.services.rock.PersonId) {
      throw new Meteor.Error("There was a problem joining this group");
    }

    // user || (user = { services: { rock: {} }})
    var _user$services$rock = user.services.rock;
    var PersonId = _user$services$rock.PersonId;
    var PrimaryAliasId = _user$services$rock.PrimaryAliasId;

    // first time this is used, try to load the email in memory

    if (!GROUP_MEMBER_REQUEST_EMAIL && EMAIL_EXISTS) {
      GROUP_MEMBER_REQUEST_EMAIL = _rock.api.get.sync("SystemEmails?$filter=Title eq 'Group Member Request'");
      if (!GROUP_MEMBER_REQUEST_EMAIL.length) {
        EMAIL_EXISTS = false;
      } else {
        GROUP_MEMBER_REQUEST_EMAIL = GROUP_MEMBER_REQUEST_EMAIL[0].Id;
      }
    }

    var GroupMember = {
      IsSystem: false,
      GroupId: GroupId,
      PersonId: PersonId,
      GroupMemberStatus: 2, // pending
      IsNotified: EMAIL_EXISTS, // see below
      GroupRoleId: 23, // member (need to verify this isn't dyanmic in Rock)
      Guid: (0, _guid.makeNewGuid)()
    };

    var GroupMemberId = _rock.api.post.sync("GroupMembers", GroupMember);
    console.log(GroupMemberId, GroupMember);
    if (GroupMemberId.statusText) {
      // it could be that you are already a member of this group
      // lets check that
      var inGroup = _rock.api.get.sync("GroupMembers?$filter=GroupId eq " + GroupId + " and PersonId eq " + PersonId);
      if (inGroup.length) {
        throw new Meteor.Error("You are already a member of this group");
      }

      throw new Meteor.Error("There was an error joining this group");
    }

    /*
       In order to pass a note to the leader, we try and post a communication
      entry with the additional merge field of RequestMessage per each member
      joining (in this case only one)
       @TODO
     */
    if (EMAIL_EXISTS) {
      Meteor.setTimeout(function () {
        var Person = _rock.api.get.sync("People/" + PersonId);
        var Group = _rock.api.get.sync("Groups/" + GroupId);
        var leaderQuery = (0, _rock.parseEndpoint)("\n          GroupMembers?\n            $filter=\n              GroupId eq " + GroupId + " and\n              GroupRole/IsLeader eq true\n            &$expand=\n              GroupRole,\n              Person\n            &$select=\n              Person/Id\n        ");
        var Leaders = _rock.api.get.sync(leaderQuery);
        var leaderIds = [];
        for (var _iterator = Leaders, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var leader = _ref;

          var person = _rock.api.get.sync("People/" + leader.Person.Id);
          leaderIds.push(Number(person.PrimaryAliasId));
        }

        Meteor.call("communication/email/send", GROUP_MEMBER_REQUEST_EMAIL, leaderIds, {
          RequestMessage: message,
          Person: Person,
          Group: Group
        }, function (err, response) {

          // in case this messed up, let the job handle it in Rock
          if (err) {
            _rock.api.patch.sync("GroupMembers/" + GroupMemberId, {
              IsNotified: false
            });
          }
        });
      }, 100);
    }

    return true;
  }
});