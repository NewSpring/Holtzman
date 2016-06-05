// CollectionEntries
//
// Sermons: channel_name = "sermons"
//
// TODO: not sure if it's worth busting out SimpleSchema here
//
// entryId: String,
// siteId: String,
// channelName: String,
// status: String,
// title: String,
// subtitle: String,
// collectionId: String,
// relatedSermonId: String,
// meta: {
//   urlTitle: String,
//   date: Date,
//   entryDate: Date,
//   startDate: Date,
//   endDate: Date,
//   actualDate: Date,
//   channelId: String
// }
// content: {
//   body: String,
//   scripture: String,
//   week: String,
//   speakers: String,
//   tags: String,
//   description: String,
//   ooyalaId: String,
//   images: [{
//     position: String,
//     fileName: String,
//     fileType: String,
//     fileLabel: String,
//     s3: String,
//     cloudfront: String
//   }]
// },
// media: {
//   fileName: String,
//   fileType: String,
//   s3: String,
//   cloudfront: String
// }

const CollectionEntries = new Mongo.Collection("collectionEntry");

export default CollectionEntries;
