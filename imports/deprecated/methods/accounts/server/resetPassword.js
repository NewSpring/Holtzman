/* global Meteor, check */
import { api } from "../../../../util/rock";

let RESET_EMAIL_ID = false;
if (typeof Accounts !== "undefined") {
  Accounts.emailTemplates.resetPassword.text = (user, t) => {
    console.log("setting resetPassword emailTemplates"); // eslint-disable-line
    let token = t;

    // let PersonAliasId, mergeFields
    const { PersonId } = user.services.rock;
    const { ROOT_URL } = __meteor_runtime_config__; // eslint-disable-line
    console.log("PersonId = ", PersonId); // eslint-disable-line

    const Person = api.get.sync(`People/${PersonId}`);

    if (!RESET_EMAIL_ID) {
      RESET_EMAIL_ID = api.get.sync(
        "SystemEmails?$filter=Title eq 'Reset Password'",
      );
      RESET_EMAIL_ID = RESET_EMAIL_ID[0].Id;
    }
    console.log("RESET_EMAIL_ID = ", RESET_EMAIL_ID); // eslint-disable-line

    token = token.split("/");
    token = token[token.length - 1];
    console.log("token = ", token); // eslint-disable-line
    console.log("about to call the communication/email/send function"); // eslint-disable-line
    Meteor.call(
      "communication/email/send",
      RESET_EMAIL_ID,
      Number(Person.PrimaryAliasId),
      {
        ResetPasswordUrl: `${ROOT_URL}/_/reset-password/${token}`,
        Person,
      },
      () => {},
    );

    return false;
  };
}

Meteor.methods({
  "rock/accounts/reset": function resetAccount(current, newPassword) {
    // check(current, String)
    check(newPassword, String);

    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your password");
    }

    const user = Meteor.users.findOne(this.userId);
    const email = user.emails[0].address;
    const Username = email; // this will need to be adjusted long term

    // special case for AD lookup
    if (email.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT");
    }

    let isAuthorized = false;
    if (current) {
      try {
        isAuthorized = api.post.sync("Auth/login", {
          Username,
          Password: current,
        });
      } catch (e) {
        isAuthorized = false;
      }

      if (!isAuthorized) {
        throw new Meteor.Error("Existing password is incorrect");
      }
    }

    let RockUser = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`);
    RockUser = RockUser[0];
    RockUser.PlainTextPassword = newPassword;
    RockUser.IsConfirmed = true;
    RockUser.EntityTypeId = 27;
    try {
      const response = api.put.sync(`UserLogins/${RockUser.Id}`, RockUser);
      if (response.statusText) {
        // eslint-disable-next-line
        console.error("@@GROUP_ADD_ERROR", RockUser, response);
        throw new Meteor.Error(
          "It looks like we had an unexpected issue! We are so sorry! Please try again",
        );
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error("@@GROUP_ADD_SECOND_ERROR", e, e.message);
      throw new Meteor.Error(
        "It looks like we had an unexpected issue! We are so sorry! Please try again",
      );
    }

    Accounts.setPassword(this.userId, newPassword, { logout: false });

    return true;
  },
});
