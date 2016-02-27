/*global Meteor, check */



import { api, Lava } from "../../../util/rock"
import { makeNewGuid } from "../../../util"


// @TODO abstract
import Liquid from "liquid-node"
const Parser = new Liquid.Engine

Parser.registerFilters({
  Attribute: function(variable, key){

    if (variable === "Global") {
      let global = this.context.findVariable("GlobalAttribute")
      return global.then((response) => {
        return response[key]
      })
    }

  },
  Format: function(value, format){

    // hardcode number formating for now
    if (format === "#,##0.00") {
      value = Number(value).toFixed(2)

      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
})



Meteor.methods({
  "communication/email/send": function(emailId, PersonAliasId, mergeFields){
    check(emailId, Number)
    check(PersonAliasId, Number)

    let Email = api.get.sync(`SystemEmails/${emailId}`)

    if (!Email.Body || !Email.Subject) {
      throw new Meteor.Error(`No email body or subject found for ${emailId}`)
    }

    /*

      Get global attributes from Rock and map to JSON

      @TODO depreciate for MergeFieldsJson

    */
    const GlobalAttribute = {}
    const Globals = api.get.sync("AttributeValues?$filter=Attribute/EntityTypeId eq null&$expand=Attribute&$select=Attribute/Key,Value")
    const Defaults = api.get.sync("Attributes?$filter=EntityTypeId eq null&$select=DefaultValue,Key")

    for (let d of Defaults) { GlobalAttribute[d.Key] = d.DefaultValue }
    for (let g of Globals) { GlobalAttribute[g.Attribute.Key] = g.Value }
    mergeFields = {...mergeFields, ...{ GlobalAttribute }}

    return Promise.all([
      Parser.parseAndRender(Email.Subject, mergeFields),
      Parser.parseAndRender(Email.Body, mergeFields)
      // Lava.render(Email.subect, mergeFields),
      // Lava.render(Email.Body, mergeFields)
    ])
      .then(([subject, body]) => {

        let Communication = {
          SenderPersonAliasId: null,
          Status: 3,
          IsBulkCommunication: false,
          Guid: makeNewGuid(),
          Subject: subject,
          MediumData: {
            HtmlMessage: body
          }
        }

        return api.post("Communications", Communication)

      })
      .then((CommunicationId) => {

        if (CommunicationId.statusText) {
          throw new Meteor.Error(CommunicationId)
        }

        // this is a bug in core right now. We can't set Mandrill on the initial
        // post because it locks everything up, we can however, patch it
        api.patch.sync(`Communications/${CommunicationId}`, {
          MediumEntityTypeId: 37 // Mandrill
        })


        let CommunicationRecipient = {
          PersonAliasId,
          CommunicationId,
          Status: 0, // Pending
          Guid: makeNewGuid()
        }

        return api.post("CommunicationRecipients", CommunicationRecipient)

      })
      .then((CommunicationRecipientId) => {

        if (CommunicationRecipientId.statusText) {
          throw new Meteor.Error(CommunicationRecipientId)
        }

        return CommunicationRecipientId
      })
      .catch((e) => {
        throw e
      })


  }
})
