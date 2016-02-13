/*global Meteor, check */

import { api } from "../../../util/rock"
import { makeNewGuid } from "../../../util"

Meteor.methods({
  "communication/email/send": function(emailId, PersonAliasId, mergeFields){
    console.log(emailId, PersonAliasId, mergeFields)
    check(emailId, Number)
    check(PersonAliasId, Number)

    let Email = api.get.sync(`SystemEmails/${emailId}`)

    if (!Email.Body || !Email.Subject) {
      throw new Meteor.Error(`No email body or subject found for ${emailId}`)
    }

    let Communication = {
      SenderPersonAliasId: null,
      Status: 3,
      IsBulkCommunication: false,
      Guid: makeNewGuid(),
      MediumData: {
        Subject: Email.Subject,
        HtmlMessage: Email.Body
      }
    }

    let CommunicationId = api.post.sync("Communications", Communication)

    if (CommunicationId.statusText) {
      throw new Meteor.Error(CommunicationId)
    }

    // this is a bug in core right now. We can't set Mandrill on the initial
    // post because it locks everything up, we can however, patch it
    api.patch.sync(`Communications/${CommunicationId}`, {
      MediumEntityTypeId: 37 // Mandrill
    })

    const AdditionalMergeValuesJson = JSON.stringify(mergeFields)

    let CommunicationRecipient = {
      PersonAliasId,
      CommunicationId,
      Status: 0, // Pending
      AdditionalMergeValuesJson,
      Guid: makeNewGuid()
    }

    let CommunicationRecipientId = api.post.sync("CommunicationRecipients", CommunicationRecipient)

    if (CommunicationRecipientId.statusText) {
      throw new Meteor.Error(CommunicationRecipientId)
    }

    return CommunicationRecipientId

  }
})
