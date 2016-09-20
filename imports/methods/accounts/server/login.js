/* global Meteor, check */
import moment from "moment";
import { api } from "../../../util/rock";

Meteor.methods({
  "rock/accounts/login": (u, p) => {
    const password = p;
    let Username = u;

    check(Username, String);
    check(password, String);

    const email = Username;

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      Username = Username.replace(/@newspring.cc/, "");
    }

    const isAuthorized = api.post.sync("Auth/login", { Username, Password: password });
    if (isAuthorized.statusText) throw new Meteor.Error("Your password is incorrect");

    let userAccount = Accounts.findUserByEmail(email);

    // ensure the users exists if they tried to login
    if (isAuthorized && !userAccount) {
      userAccount = Accounts.createUser({
        email,
        password,
      });


      const user = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`);
      const { PersonId } = user[0];
      if (!user[0].IsConfirmed) {
        api.post(`UserLogins/${user[0].Id}`, { IsConfirmed: true }, (err, response) => {
        });
      }

      api.patch(`UserLogins/${user[0].Id}`, {
        LastLoginDateTime: `${moment().toISOString()}`,
      });

      const person = api.get.sync(`People/${PersonId}`);
      const { PrimaryAliasId } = person;

      if (userAccount) {
        Meteor.users.update(userAccount._id || userAccount, { // eslint-disable-line
          $set: {
            "services.rock": {
              PersonId,
              PrimaryAliasId,
            },
          },
        });
      }

      if (process.env.NODE_ENV === "production") {
        Meteor.setTimeout(() => {
          const currentCount = Meteor.users.find().count();
          const missing = `${50000 - currentCount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          const text = `Another user signed up for a NewSpring Account! Only ${missing} to go!`;


          Meteor.call("communication/slack/send", text, "#users");
        }, 10);
      }

      // slack hook here
    } else {
      // eslint-disable-next-line
      Accounts.setPassword(userAccount._id, password, { logout: false });
      api.get(`UserLogins?$filter=UserName eq '${Username}'`, (err, user) => {
        const { PersonId } = user[0];

        if (!user[0].IsConfirmed) {
          api.post(`UserLogins/${user[0].Id}`, { IsConfirmed: true }, (error, response) => {
            // eslint-disable-next-line
            console.log(error, response);
          });
        }

        api.patch(`UserLogins/${user[0].Id}`, {
          LastLoginDateTime: `${moment().toISOString()}`,
        });

        api.get(`People/${PersonId}`, (e, person) => {
          const { PrimaryAliasId } = person;

          if (userAccount) {
            const userRock = userAccount.services.rock;
            if (userRock.PersonId !== PersonId || userRock.PrimaryAliasId !== PrimaryAliasId) {
              // eslint-disable-next-line
              Meteor.users.update(userAccount._id || userAccount, {
                $set: {
                  "services.rock": {
                    PersonId,
                    PrimaryAliasId,
                  },
                },
              });
            }
          }
        });
      });
    }


    return isAuthorized;
  },
});
