// Collections
//
// Series: channel_name = "newspring_series"
//
// TODO: not sure if it's worth busting out SimpleSchema here
//
// entryId: String,
// siteId: String,
// channelName: String,
// status: String,
// title: String,
// seriesId: String,
// meta: {
//   urlTitle: String,
//   date: Date,
//   entryDate: Date,
//   startDate: Date,
//   endDate: Date,
//   actualDate: Date,
//   channelId: String
// },
// content: {
//   description: String,
//   hashtag: String,
//   ooyalaId: String,
//   images: [{
//     position: String,
//     fileName: String,
//     fileType: String,
//     fileLabel: String,
//     s3: String,
//     cloudfront: String
//   }]
//   collectionBackgroundColor: String,
//   tags: String
// },
// downloads: [{
//   description: String,
//   title: String,
//   file: String
// }]

const Collections = new Mongo.Collection("collection");

export default Collections;
