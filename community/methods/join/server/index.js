/*global Meteor, check */
import { api, parseEndpoint } from "../../../../core/util/rock"
import { makeNewGuid } from "../../../../core/util/guid"
import Moment from "moment"


let GROUP_MEMBER_REQUEST_EMAIL = false,
    EMAIL_EXISTS = true;

Meteor.methods({
  "community/actions/join": function(GroupId, message) {

    if (!this.userId) {
      throw new Meteor.Error("Must be logged in to upload an avatar")
    }

    let user = Meteor.user()
    user || (user = { services: { rock: {} }})
    const { PersonId, PrimaryAliasId } = user.services.rock
    // 2300289

    // first time this is used, try to load the email in memory
    if (!GROUP_MEMBER_REQUEST_EMAIL && EMAIL_EXISTS) {
      GROUP_MEMBER_REQUEST_EMAIL = api.get.sync(`SystemEmails?$filter=Title eq 'Group Member Request'`)
      if (!GROUP_MEMBER_REQUEST_EMAIL.length) {
        EMAIL_EXISTS = false
      } else {
        GROUP_MEMBER_REQUEST_EMAIL = GROUP_MEMBER_REQUEST_EMAIL[0].Id
      }
    }

    const GroupMember = {
      IsSystem: false,
      GroupId,
      PersonId,
      GroupMemberStatus: 2, // pending
      IsNotified: EMAIL_EXISTS, // see below
      GroupRoleId: 23,// member (need to verify this isn't dyanmic in Rock)
      Guid: makeNewGuid()
    }


    let GroupMemberId = api.post.sync(`GroupMembers`, GroupMember)

    if (GroupMemberId.statusText) {
      // it could be that you are already a member of this group
      // lets check that
      let inGroup = api.get.sync(`GroupMembers?$filter=GroupId eq ${GroupId} and PersonId eq ${PersonId}`)
      if (inGroup.length) {
        throw new Meteor.Error("You are already a member of this group")
      }

      throw new Meteor.Error(GroupMemberId.statusText)
    }

    /*

      In order to pass a note to the leader, we try and post a communication
      entry with the additional merge field of RequestMessage per each member
      joining (in this case only one)

      @TODO

    */
    if (EMAIL_EXISTS) {
      Meteor.setTimeout(() => {
        const Person = api.get.sync(`People/${PersonId}`)
        const Group = api.get.sync(`Groups/${GroupId}`)
        let leaderQuery = parseEndpoint(`
          GroupMembers?
            $filter=
              GroupId eq ${GroupId} and
              GroupRole/IsLeader eq true
            &$expand=
              GroupRole,
              Person
            &$select=
              Person/Id
        `)
        const Leaders = api.get.sync(leaderQuery)
        let leaderIds = []
        for (let leader of Leaders) {
          let person = api.get.sync(`People/${leader.Person.Id}`)
          leaderIds.push(Number(person.PrimaryAliasId))
        }

        Meteor.call(
          "communication/email/send",
          GROUP_MEMBER_REQUEST_EMAIL,
          leaderIds,
          {
            RequestMessage: message,
            Person,
            Group
          }
          , (err, response) => {

            // in case this messed up, let the job handle it in Rock
            if (err) {
              api.patch.sync(`GroupMembers/${GroupMemberId}`, {
                IsNotified: false
              })
            }

          }
        )
      }, 100)

    }

    return true
  }
})
