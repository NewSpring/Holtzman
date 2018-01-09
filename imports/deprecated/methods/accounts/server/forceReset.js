/* global Meteor, check */
import { api } from "../../../../util/rock";

Meteor.methods({
  "rock/accounts/forceReset": function forceReset(Username) {
    console.log("********** inside forceReset **********");
    console.log("Username = ", Username);
    check(Username, String);

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT");
    }

    let RockUser = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`);
    console.log("RockUser = ", RockUser);
    console.log("RockUser.statusText = ", RockUser.statusText);
    console.log("RockUser.length = ", RockUser.length);
    if (RockUser.statusText || !RockUser.length) {
      // we don't tell people there account doesn't exist
      return true;
    }

    RockUser = RockUser[0];
    const { PersonId } = RockUser;
    console.log("PersonId = ", PersonId);

    try {
      const person = api.get.sync(`People/${PersonId}`);
      const { PrimaryAliasId } = person;

      const meteorUserId = Accounts.createUser({ email: Username });
      console.log("meteorUserId = ", meteorUserId);

      Meteor.users.upsert(
        meteorUserId,
        {
          $set: {
            "services.rock": {
              PersonId,
              PrimaryAliasId,
            },
          },
        },
        err => {
          console.log("upsert callback");
          console.log("err = ", err);
          if (!err) Accounts.sendResetPasswordEmail(meteorUserId);
        },
      );
    } catch (e) {
      console.log("there was an error in forceReset");
      // eslint-disable-next-line
      console.log(e);
    }

    return true;
  },
});
