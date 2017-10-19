/* global Meteor, check */
import { api, parseEndpoint } from "../../../../util/rock";
import makeNewGuid from "../../../../util/guid";


let GROUP_MEMBER_REQUEST_EMAIL = false;
let EMAIL_EXISTS = true;

Meteor.methods({
  "community/actions/join": function joinGroup(GroupId, message) {
    if (!this.userId) {
      throw new Meteor.Error("You must be signed in to join a group");
    }

    const user = Meteor.users.findOne({ _id: this.userId });

    if (!user || !user.services || !user.services.rock || !user.services.rock.PersonId) {
      throw new Meteor.Error("There was a problem joining this group");
    }

    // user || (user = { services: { rock: {} }})
    const { PersonId } = user.services.rock;

    // first time this is used, try to load the email in memory
    if (!GROUP_MEMBER_REQUEST_EMAIL && EMAIL_EXISTS) {
      GROUP_MEMBER_REQUEST_EMAIL = api.get.sync(
        "SystemEmails?$filter=Title eq 'Group Member Request'",
      );
      if (!GROUP_MEMBER_REQUEST_EMAIL.length) {
        EMAIL_EXISTS = false;
      } else {
        GROUP_MEMBER_REQUEST_EMAIL = GROUP_MEMBER_REQUEST_EMAIL[0].Id;
      }
    }

    const GroupMember = {
      IsSystem: false,
      GroupId,
      PersonId,
      GroupMemberStatus: 2, // pending
      IsNotified: EMAIL_EXISTS, // see below
      GroupRoleId: 23, // member (need to verify this isn't dyanmic in Rock)
      Guid: makeNewGuid(),
    };

    const GroupMemberId = api.post.sync("GroupMembers", GroupMember);

    if (GroupMemberId.statusText) {
      // it could be that you are already a member of this group
      // lets check that
      const inGroup = api.get.sync(
        `GroupMembers?$filter=GroupId eq ${GroupId} and PersonId eq ${PersonId}`,
      );
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
      Meteor.setTimeout(() => {
        const Person = api.get.sync(`People/${PersonId}`);
        const Group = api.get.sync(`Groups/${GroupId}`);
        const leaderQuery = parseEndpoint(`
          GroupMembers?
            $filter=
              GroupId eq ${GroupId} and
              GroupRole/IsLeader eq true
            &$expand=
              GroupRole,
              Person
            &$select=
              Person/Id
        `);
        const Leaders = api.get.sync(leaderQuery);
        const leaderIds = [];
        for (const leader of Leaders) {
          const person = api.get.sync(`People/${leader.Person.Id}`);
          leaderIds.push(Number(person.PrimaryAliasId));
        }

        Meteor.call(
          "communication/email/send",
          GROUP_MEMBER_REQUEST_EMAIL,
          leaderIds,
          {
            RequestMessage: message,
            Person,
            Group,
          }
          , err => {
            // in case this messed up, let the job handle it in Rock
            if (err) {
              api.patch.sync(`GroupMembers/${GroupMemberId}`, {
                IsNotified: false,
              });
            }
          },
        );
      }, 100);
    }

    return true;
  },
});
