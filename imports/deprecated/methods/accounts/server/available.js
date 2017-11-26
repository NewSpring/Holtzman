/* global Meteor, check */
import { api, parseEndpoint } from "../../../../util/rock";
import Validate from "../../../../util/validate";

function getPhoto(per = {}) {
  const person = per;
  if (person.Photo && person.Photo.Path) {
    let { Path } = person.Photo;

    // is relative to Rock
    if (Path[0] === "~") {
      Path = Path.substr(2);
      Path = Meteor.settings.public.rock.baseURL + Path;

      return Path;
    }

    if (Path.indexOf("?") > -1) {
      Path = Path.slice(0, Path.indexOf("?"));
    }

    // is a storage provider
    return Path;
  }

  if (!person.PhotoUrl) {
    // eslint-disable-next-line max-len
    person.PhotoUrl = "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/members.nophoto_1000_1000_90_c1.jpg";
  }

  return person.PhotoUrl;
}

Meteor.methods({
  "rock/accounts/available": mail => {
    let email = mail;
    check(email, String);

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      email = email.replace(/@newspring.cc/, "");
    }

    const isAvailable = api.get.sync(`userlogins/available/${email}`);
    const peopleWithoutAccountEmails = [];

    let alternateAccounts = [];


    if (isAvailable) {
      // first see if a person has this email but doesn't have an account
      let People = api.get.sync(`People/GetByEmail/${email}`);

      if (!People.length) {
        const SecondaryEmailPeople = api.get.sync(parseEndpoint(`
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
        `));

        // showing more than 5 possible people in this case
        // would be confusing to a user so lets limit our lookup
        const realisticReturnAmounts = 5;
        const ids = SecondaryEmailPeople.map(x => (
          `(Id eq ${x.EntityId})`
        )).slice(0, realisticReturnAmounts).join(" and ");

        /*

          what we want to pass back is a list of emails
          that are primary on file, and prompt the person
          to create an account based on that person record

        */
        People = api.get.sync(`People?$filter=${ids}&$expand=Photo`);
      }


      const peopleToCheck = [];

      if (People.length) {
        for (const person of People) {
          peopleWithoutAccountEmails.push({
            email: person.Email,
            firstName: person.NickName || person.FirstName,
            lastName: person.LastName,
            photo: getPhoto(person),
            id: person.Id,
          });

          if (person.Users) {
            alternateAccounts = alternateAccounts
              .concat(person.Users.map(x => (x.UserName)))
              .filter(Validate.isEmail);
          } else {
            peopleToCheck.push(person.Id);
          }
        }
      }

      // if we found some people with that secondary email
      // lets see if they have any user logins to the
      // user can go ahead and try to login with that account
      if (peopleToCheck.length) {
        for (const personId of peopleToCheck) {
          const emailsForPerson = api.get.sync(`UserLogins?$filter=PersonId eq ${personId}`);
          if (emailsForPerson.length) {
            for (const UserLogin of emailsForPerson) {
              if (Validate.isEmail(UserLogin.UserName)) {
                alternateAccounts.push(UserLogin.UserName);
              }
            }
          }
        }
      }
    }

    return {
      isAvailable,
      alternateAccounts,
      peopleWithoutAccountEmails,
    };
  },
});
