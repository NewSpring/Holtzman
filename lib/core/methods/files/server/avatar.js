"use strict";

var _rock = require("../../../util/rock");

Meteor.methods({
  "file/upload/avatar": function fileUploadAvatar(id) {

    if (!this.userId) {
      throw new Meteor.Error("Must be logged in to upload an avatar");
    }

    var user = Meteor.users.findOne(this.userId);
    user || (user = { services: { rock: {} } });
    var PersonId = user.services.rock.PersonId;


    var Person = _rock.api.get.sync("People/" + PersonId);
    if (Person.statusText) {
      throw new Meteor.Error(Person.statusText);
    }

    var PhotoId = Person.PhotoId;


    var upload = _rock.api.patch.sync("People/" + PersonId, {
      PhotoId: id
    });

    if (upload.statusText) {
      throw new Meteor.Error(upload.statusText);
    }

    try {
      _rock.api["delete"]("BinaryFiles/" + PhotoId);
    } catch (e) {}

    return true;
  }
});
/*global Meteor, check */