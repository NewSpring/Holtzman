// Music
//
// entryId: String,
// siteId: String,
// channelName: String,
// status: String,
// title: String,
// image: String,
// blurredImage: String,
// meta: {
//   urlTitle: String,
//   date: Date,
//   entryDate: Date,
//   startDate: Date,
//   endDate: Date,
//   actualDate: Date,
//   channelId: String
// },
// tracks: [{
//   title: String,
//   duration: String,
//   file: String
// }],
// downloads: [{
//   title: String,
//   file: String
// }],
// links: [{
//   cta: String,
//   link: String
// }]

const Music = new Mongo.Collection("music");

export default Music;
