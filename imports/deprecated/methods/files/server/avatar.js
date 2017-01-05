
/* global Meteor, check */

import { api } from "../../../../util/rock";

Meteor.methods({
  "file/upload/avatar": function avatar(id) {
    if (!this.userId) {
      throw new Meteor.Error("Must be logged in to upload an avatar");
    }

    let user = Meteor.users.findOne(this.userId);
    user || (user = { services: { rock: {} } }); // eslint-disable-line
    const { PersonId } = user.services.rock;

    const Person = api.get.sync(`People/${PersonId}`);
    if (Person.statusText) {
      throw new Meteor.Error(Person.statusText);
    }

    const { PhotoId } = Person;

    const upload = api.patch.sync(`People/${PersonId}`, {
      PhotoId: id,
    });

    if (upload.statusText) {
      throw new Meteor.Error(upload.statusText);
    }

    try {
      api.delete(`BinaryFiles/${PhotoId}`);
    } catch (e) {} // eslint-disable-line


    return true;
  },
});
