/* global Meteor, check */
import { api } from "../../../../util/rock";

Meteor.methods({
  "rock/accounts/forceReset": function forceReset(Username) {
    check(Username, String);

    // special case for AD lookup
    if (Username.indexOf("@newspring.cc") > -1) {
      throw new Meteor.Error("NewSpring staff accounts are managed by IT");
    }

    let RockUser = api.get.sync(`UserLogins?$filter=UserName eq '${Username}'`);
    if (RockUser.statusText || !RockUser.length) {
      // we don't tell people there account doesn't exist
      return true;
    }

    RockUser = RockUser[0];
    const { PersonId } = RockUser;

    try {
      const person = api.get.sync(`People/${PersonId}`);
      const { PrimaryAliasId } = person;

      const meteorUserId = Accounts.createUser({ email: Username });

      Meteor.users.upsert(meteorUserId, {
        $set: {
          "services.rock": {
            PersonId,
            PrimaryAliasId,
          },
        },
      },
        err => {
          if (!err) Accounts.sendResetPasswordEmail(meteorUserId);
        },
      );
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }


    return true;
  },
});
