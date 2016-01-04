"use strict";

if (Meteor.isClient) {
  Meteor.subscribe("person");
  Meteor.subscribe("campuses");
}