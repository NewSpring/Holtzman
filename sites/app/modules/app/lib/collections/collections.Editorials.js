// Editorials
//
// Devotionals: channel_name = "devotionals"
// Articles: channel_name = "articles"
// News: channel_name = "news"
//
// TODO: not sure if it's worth busting out SimpleSchema here
//
// entryId: String,
// siteId: String,
// channelName: String,
// status: String,
// title: String,
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
//   body: String,
//   scripture: String,
//   tags: String,
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
// author: {
//   authorId: String,
//   firstName: String,
//   lastName: String,
//   fullName: String
// },
// series: {
//   seriesId: String,
//   slug: String,
//   title: String
// },
// fuseSeries: {
//   seriesId: String,
//   slug: String,
//   title: String
// }

const Editorials = new Mongo.Collection("editorial");

export default Editorials;
