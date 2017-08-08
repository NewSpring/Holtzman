/* global Meteor, check */

import toPascalCase from "to-pascal-case";
import toSnakeCase from "to-snake-case";
import moment from "moment";
import Liquid from "liquid-node";


import { api } from "../../../../util/rock";
import { makeNewGuid } from "../../../../util";

// @TODO abstract
const Parser = new Liquid.Engine();

const StandardFilters = { ...Liquid.StandardFilters };
const caseChangedFilter = {};
for (const filter in StandardFilters) { // eslint-disable-line
  const newFilter = toPascalCase(filter);


  caseChangedFilter[newFilter] = (i, format) => {
    let input = i;
    input = toSnakeCase(input);

    return StandardFilters[filter](input, format);
  };
}

function toDate(i) {
  let input = i;
  if (input == null) return null;
  if (input instanceof Date) return input;
  if (input === "now" || input === "Now") return new Date();

  if (_.isNumber(input)) {
    input = parseInt(input); // eslint-disable-line
  } else {
    input = toString(input);
    if (input.length === 0) return null;
    input = Date.parse(input);
  }
  if (input != null) return new Date(input);

  return null;
}

Parser.registerFilters({ ...caseChangedFilter,
  ...{
    Attribute(variable, key) {
      if (variable === "Global") {
        const global = this.context.findVariable("GlobalAttribute");
        return global.then((response) => response[key]);
      }
      return null;
    },
    Format(value, format) {
      // hardcode number formating for now
      if (format === "#,##0.00") {
        return `${Number(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return null;
    },
    Date(i, f) {
      let input = i;
      let format = f;

      input = toDate(input);

      if (input == null) return "";
      if (toString(format).length === 0) return input.toUTCString();

      format = format.replace(/y/gmi, "Y");
      return moment(input).format(format);
      // return Liquid.StandardFilters.date(input, format.toLowerCase())
    },
  },
});


Meteor.methods({
  "communication/email/send": function sendEmail(emailId, PersonAliasId, merge) {
    let mergeFields = merge;
    check(emailId, Number);
    // check(PersonAliasId, Number)

    const Email = api.get.sync(`SystemEmails/${emailId}`);

    if (!Email.Body || !Email.Subject) {
      throw new Meteor.Error(`No email body or subject found for ${emailId}`);
    }

    /*

      Get global attributes from Rock and map to JSON

      @TODO depreciate for MergeFieldsJson

    */
    const GlobalAttribute = {};
    // eslint-disable-next-line max-len
    const Globals = api.get.sync("AttributeValues?$filter=Attribute/EntityTypeId eq null&$expand=Attribute&$select=Attribute/Key,Value");
    // eslint-disable-next-line max-len
    const Defaults = api.get.sync("Attributes?$filter=EntityTypeId eq null&$select=DefaultValue,Key");

    for (const d of Defaults) { GlobalAttribute[d.Key] = d.DefaultValue; }
    for (const g of Globals) { GlobalAttribute[g.Attribute.Key] = g.Value; }
    mergeFields = { ...mergeFields, ...{ GlobalAttribute } };

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
      Parser.parseAndRender(Email.Body, mergeFields),
    ])
      .then(([subject, body]) => {
        const Communication = {
          SenderPersonAliasId: null,
          Status: 3,
          IsBulkCommunication: false,
          Guid: makeNewGuid(),
          MediumEntityTypeId: 37, // Mandrill
          Subject: subject,
          MediumData: {
            HtmlMessage: body,
          },
        };

        return api.post("Communications", Communication);
      })
      .then((CommunicationId) => {
        if (CommunicationId.statusText) {
          throw new Meteor.Error(CommunicationId);
        }

        api.post(`Communications/Send/${CommunicationId}`);
        return CommunicationId;
      })
      .then((CommunicationId) => {
        if (typeof PersonAliasId === "number") {
          PersonAliasId = [PersonAliasId]; // eslint-disable-line
        }

        const ids = [];
        for (const id of PersonAliasId) {
          const CommunicationRecipient = {
            PersonAliasId: id,
            CommunicationId,
            Status: 0, // Pending
            Guid: makeNewGuid(),
          };

          const CommunicationRecipientId = api.post.sync(
            "CommunicationRecipients", CommunicationRecipient
          );

          ids.push(CommunicationRecipientId);
        }

        return ids;
      })
      .then((communications) => {
        for (const CommunicationRecipientId of communications) {
          if (CommunicationRecipientId.statusText) {
            throw new Meteor.Error(CommunicationRecipientId);
          }
        }

        return communications;
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.log(e);
        throw e;
      });
  },
});
