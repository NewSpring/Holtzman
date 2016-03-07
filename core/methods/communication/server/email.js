/*global Meteor, check */

import toPascalCase from "to-pascal-case"
import toSnakeCase from "to-snake-case"
import Moment from "moment"

import { api, Lava } from "../../../util/rock"
import { makeNewGuid } from "../../../util"


// @TODO abstract
import Liquid from "liquid-node"
const Parser = new Liquid.Engine

let StandardFilters = {...Liquid.StandardFilters}
let caseChangedFilter = {}
for (let filter in StandardFilters) {
  let newFilter = toPascalCase(filter)


  caseChangedFilter[newFilter] = (input, format) => {
    input = toSnakeCase(input)

    return StandardFilters[filter](input, format)
  }

}


function toDate(input) {
  if (input == null) {
    return;
  }
  if (input instanceof Date) {
    return input;
  }
  if (input === 'now' || input === "Now") {
    return new Date();
  }
  if (isNumber(input)) {
    input = parseInt(input);
  } else {
    input = toString(input);
    if (input.length === 0) {
      return;
    }
    input = Date.parse(input);
  }
  if (input != null) {
    return new Date(input);
  }
};

Parser.registerFilters({...caseChangedFilter, ...{
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
  },
  Date: function(input, format) {
    // console.log(this)
    input = toDate(input)

    if (input == null) {
      return "";
    } else if (toString(format).length === 0) {
      return input.toUTCString();
    } else {
      format = format.replace(/y/gmi, "Y")
      return Moment(input).format(format);
    }

    // return Liquid.StandardFilters.date(input, format.toLowerCase())
  }
}})



Meteor.methods({
  "communication/email/send": function(emailId, PersonAliasId, mergeFields){
    check(emailId, Number)
    // check(PersonAliasId, Number)

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
      // Parser.parse(Email.Subject)
      //   .then((template) => {
      //     // console.log(template)
      //     return template.render(mergeFields)
      //   }),
      // Parser.parse(Email.Body)
      //   .then((template) => {
      //     console.log(template.root.nodelist)
      //     return template.render(mergeFields)
      //   }),
      Parser.parseAndRender(Email.Subject, mergeFields),
      Parser.parseAndRender(Email.Body, mergeFields)
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


        if (typeof PersonAliasId === "number") {
          PersonAliasId = [PersonAliasId]
        }


        let ids = []
        for (let id of PersonAliasId) {
          let CommunicationRecipient = {
            PersonAliasId: id,
            CommunicationId,
            Status: 0, // Pending
            Guid: makeNewGuid()
          }

          let CommunicationRecipientId = api.post.sync("CommunicationRecipients", CommunicationRecipient)

          ids.push(CommunicationRecipientId)
        }

        return ids

      })
      .then((communications) => {

        for (let CommunicationRecipientId of communications) {
          if (CommunicationRecipientId.statusText) {
            throw new Meteor.Error(CommunicationRecipientId)
          }
        }

        return communications
      })
      .catch((e) => {
        console.log(e)
        throw e
      })


  }
})
