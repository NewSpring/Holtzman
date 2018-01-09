/* global Meteor, check */
import { api } from "../../../../util/rock";

Meteor.methods({
  "rock/accounts/forceReset": function forceReset(Username) {
    console.log("********** inside forceReset **********"); // eslint-disable-line
    console.log("Username = ", Username); // eslint-disable-line
    check(Username, String);

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT");
    }

    let RockUser = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`);
    console.log("RockUser = ", RockUser); // eslint-disable-line
    console.log("RockUser.statusText = ", RockUser.statusText); // eslint-disable-line
    console.log("RockUser.length = ", RockUser.length); // eslint-disable-line
    if (RockUser.statusText || !RockUser.length) {
      // we don't tell people there account doesn't exist
      return true;
    }

    RockUser = RockUser[0];
    const { PersonId } = RockUser;
    console.log("PersonId = ", PersonId); // eslint-disable-line

    try {
      const person = api.get.sync(`People/${PersonId}`);
      const { PrimaryAliasId } = person;

      const meteorUserId = Accounts.createUser({ email: Username });
      console.log("meteorUserId = ", meteorUserId); // eslint-disable-line

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
          console.log("upsert callback"); // eslint-disable-line
          console.log("err = ", err); // eslint-disable-line
          if (!err) Accounts.sendResetPasswordEmail(meteorUserId);
        },
      );
    } catch (e) {
      console.log("there was an error in forceReset"); // eslint-disable-line
      // eslint-disable-next-line
      console.log(e);
    }

    return true;
  },
});
