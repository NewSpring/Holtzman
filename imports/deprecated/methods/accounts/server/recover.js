/* global Meteor, check */
import moment from "moment";
import { api } from "../../../../util/rock";

let RECOVER_ACCOUNT = false;
if (typeof Accounts !== "undefined") {
  Accounts.emailTemplates.enrollAccount.text = (user, t) => {
    let token = t;

    // let PersonAliasId, mergeFields
    const { PersonId } = user.profile.rock;
    const { ROOT_URL } = __meteor_runtime_config__; // eslint-disable-line

    const Person = api.get.sync(`People/${PersonId}`);

    if (!RECOVER_ACCOUNT) {
      RECOVER_ACCOUNT = api.get.sync("SystemEmails?$filter=Title eq 'Recover Account'");
      RECOVER_ACCOUNT = RECOVER_ACCOUNT.length ? RECOVER_ACCOUNT[0].Id : false;
    }

    token = token.split("/");
    token = token[token.length - 1];
    if (RECOVER_ACCOUNT) {
      Meteor.call(
        "communication/email/send",
        RECOVER_ACCOUNT,
        Number(Person.PrimaryAliasId),
        {
          ResetPasswordUrl: `${ROOT_URL}/_/reset-password/${token}`,
          Person,
        }
        , () => {},
      );
    }


    return false;
  };
}

Meteor.methods({
  "rock/accounts/recover": (email, PersonId) => {
    check(email, String);
    check(PersonId, Number);

    let meteorUserId;

    // Create Apollos Account
    // try to create new meteor account
    try {
      const user = Accounts.findUserByEmail(email);
      if (user && user._id) { // eslint-disable-line
        meteorUserId = user._id; // eslint-disable-line
      } else {
        meteorUserId = Accounts.createUser({
          email,
          profile: {
            rock: {
              PersonId,
            },
          },
        });
      }
    } catch (e) {
      throw new Meteor.Error(
        "There was a problem finishing your account, please try again or create a new account",
      );
    }

    // Create Rock Account
    const user = {
      PersonId,
      EntityTypeId: 27,
      UserName: email,
      IsConfirmed: false,
      // PlainTextPassword: account.password,
      LastLoginDateTime: `${moment().toISOString()}`,
    };

    const createdUser = api.post.sync("UserLogins", user);
    if (createdUser.statusText) {
      throw new Meteor.Error(
        "There was a problem finishing your account, please try again or create a new account",
      );
    }

    try {
      const person = api.get.sync(`People/${PersonId}`);
      const { PrimaryAliasId } = person;

      Meteor.users.update(meteorUserId, {
        $set: {
          "services.rock": {
            PersonId,
            PrimaryAliasId,
          },
        },
      });

      // Send Reset Email
      Accounts.sendEnrollmentEmail(meteorUserId);

      // let the client know
      return true;
    } catch (e) {
      // eslint-disable-next-line
      console.error("@@RECOVER_ERROR", e);
      throw new Meteor.Error(
        "There was a problem finishing your account, please try again or create a new account",
      );
    }
  },
});
