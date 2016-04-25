/*global Meteor, Mongo */

export interface Campus {
  Name: string;
  Shortcode: string;
  Id: number;
};

let campuses: Mongo.Collection<Campus> = null;

if (Meteor.isClient) {
  campuses = new Mongo.Collection("campuses") as Mongo.Collection<Campus>;
}

if (Meteor.isServer) {
  campuses = new Mongo.Collection(null) as Mongo.Collection<Campus>;
}

export default campuses;
