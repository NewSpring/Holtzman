/*global Meteor, Mongo */

export interface Person {
  Id: Number;
  FirstName: string;
  LastName: string;
  NickName: string;
};

let people: Mongo.Collection<Person> = null;

if (Meteor.isClient) {
  people = new Mongo.Collection("people") as Mongo.Collection<Person>;
}

if (Meteor.isServer) {
  people = new Mongo.Collection(null) as Mongo.Collection<Person>;
}

export default people;
