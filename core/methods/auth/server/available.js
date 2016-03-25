/*global Meteor, check */
import { api, parseEndpoint } from "../../../util/rock"
import Validate from "../../../util/validate"

Meteor.methods({
  "rock/auth/available": (email) => {
    check(email, String)

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "")
    }

    let isAvailable = api.get.sync(`userlogins/available/${email}`),
        alternateAccounts = [],
        peopleWithoutAccountEmails = [];

    if (isAvailable) {
      // first see if a person has this email but doesn't have an account
      let People = api.get.sync(`People/GetByEmail/${email}`)
      if (People.length) {
        // we essentially treat this as a single person, technically
        // it could be more but this an edge case we are choosing to not
        // support because it adds a large complexity to the UI
        peopleWithoutAccountEmails = [{
          email,
          id: People[0].Id
        }]

        // if we found a person with this email we can see if they have
        // any other accounts on file!
        let emailsForPerson = api.get.sync(
          `UserLogins?$filter=PersonId eq ${People[0].Id}`
        );

        if (emailsForPerson.length) {
          for (let UserLogin of emailsForPerson) {
            if (Validate.isEmail(UserLogin.UserName)) {
              alternateAccounts.push(UserLogin.UserName)
            }
          }
        }

      } else {
        // check all Secondary Emails in the system to see if there
        // is a person assoicated with that email
        // @Note on rock systems without `SecondaryEmail` as a person attribute
        // this will always be empty
        let SecondaryEmailPeople = api.get.sync(parseEndpoint(`
          AttributeValues?
            $filter=
              Attribute/Key eq 'SecondaryEmail' and
              Value eq '${email}'
            &$top=1
            &$expand=
              Attribute
            &$select=
              Value,
              EntityId
        `))

        if (SecondaryEmailPeople.length) {
          // showing more than 5 possible people in this case
          // would be confusing to a user so lets limit our lookup
          let realisticReturnAmounts = 5;
          let ids = SecondaryEmailPeople.map((x) => {
            return `(Id eq ${x.EntityId})`
          }).slice(0, realisticReturnAmounts).join(" and ")

          /*

            what we want to pass back is a list of emails
            that are primary on file, and prompt the person
            to create an account based on that person record

          */
          People = api.get.sync(`People?$filter=${ids}`);
          let peopleToCheck = []
          if (People.length) {
            for (let person in People) {

              peopleWithoutAccountEmails.push({
                email: person.Email,
                id: person.Id
              });

              peopleToCheck.push(person.Id);

            }
          }

          // if we found some people with that secondary email
          // lets see if they have any user logins to the
          // user can go ahead and try to login with that account
          if (peopleToCheck.length) {
            for (let personId of peopleToCheck) {
              let emailsForPerson = api.get.sync(`UserLogins?$filter=PersonId eq ${personId}`);
              if (emailsForPerson.length) {
                for (let UserLogin of emailsForPerson) {
                  if (Validate.isEmail(UserLogin.UserName)) {
                    alternateAccounts.push(UserLogin.UserName)
                  }
                }
              }
            }
          }
        }

      }
    }

    return {
      isAvailable,
      alternateAccounts,
      peopleWithoutAccountEmails
    }
  }
})
