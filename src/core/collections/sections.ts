/*global Mongo*/
export interface Section {
  Id: Number;
};

const sections = new Mongo.Collection("sections") as Mongo.Collection<Section>;

export default sections;
