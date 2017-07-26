/* global Meteor, check */
import { api } from "../../../../util/rock";

Meteor.methods({
  "rock/accounts/update": function updateAccount(data) {
    if (!this.userId) {
      throw new Meteor.Error("You must be logged in to change your information");
    }

    const user = Meteor.users.findOne(this.userId);

    const Person = { ...data };

    // clean up data
    for (const key in Person) {
      // eslint-disable-line
      if (!Person[key]) {
        delete Person[key];
      }
    }

    let result;

    if (data.Campus) {
      const query = api.parseEndpoint(`
        Groups/GetFamilies/${user.services.rock.PersonId}?
          $expand=
            GroupLocations,
            GroupLocations/Location,
            GroupLocations/GroupLocationTypeValue
          &$select=
            Id,
            GroupLocations/Location/Id,
            GroupLocations/GroupLocationTypeValue/Value
      `);

      let locations = api.get.sync(query);
      locations = locations[0];
      const GroupId = locations.Id;
      locations = locations.GroupLocations;

      // move campus to another call
      const Campus = data.Campus;
      delete Person.Campus;

      if (GroupId) {
        result = api.patch.sync(`Groups/${GroupId}`, { CampusId: Campus });
      }
    }

    // If the user has changed their email address:
    // change their NewSpring account user name to match the new email address. This is in Meteor
    // update the Rock UserLogin user name to match the new email address

    if (Person.Email !== user.emails[0].address) {
      // Get the current userLogin information
      const userLoginInfo = api.get.sync(
        `UserLogins?$filter=UserName eq '${user.emails[0].address}'`
      );
      // reset all the things
      Accounts.setUsername(user._id, Person.Email);
      Meteor.users.update(user._id, {
        $set: { "emails.0.address": Person.Email },
      });
      result = api.patch.sync(`UserLogins/${userLoginInfo[0].Id}`, { UserName: Person.Email });
    }

    if (user.services.rock.PersonId && Person.Email.indexOf("@newspring.cc") <= -1) {
      result = api.patch.sync(`People/${user.services.rock.PersonId}`, Person);
    }

    if (result.status && result.status === 400) {
      throw new Meteor.Error("There was a problem updating your profile");
    }

    return true;
  },
});
