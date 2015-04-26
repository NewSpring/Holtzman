/*

  @TODO: Move to NewSpring/apollos-groups?
 */
var group, member;

Apollos.groups = new Mongo.Collection("groups");

member = new SimpleSchema({
    personId: {
        type: Number
    },
    role: {
        type: String
    }
});

group = Apollos.generateSchema({
    groupId: {
        type: Number,
        optional: true
    },
    campusId: {
        type: Number,
        optional: true
    },
    name: {
        type: String,
        optional: true
    },
    type: {
        type: String,
        optional: true
    },
    guid: {
        type: String,
        optional: true,
        regEx: Apollos.regex.guid
    },
    photoURL: {
        type: String,
        optional: true
    },
    locationIds: {
        type: [Number]
    },
    members: {
        type: [member]
    },
    status: {
        type: Number,
        decimal: false,
        optional: true
    }
});

Apollos.groups.attachSchema(group);