// Access Key ID:
// AKIAJOFLGTDGGRVC24LA
// Secret Access Key:
// 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

let Avatars;

if (typeof FS != "undefined" && FS != null) {

  FS.File.prototype.S3Url = function(storeName) {
    var self = this;
    if (!self.isMounted()) {
      return null;
    }
    var collection = self.getCollection();
    var store = storeName ? collection.storesLookup[storeName] : collection.primaryStore || {};
    var bucket = store.bucket;
    var storeFolder = store.folder ? store.folder: "";
    if (!bucket) {
      return null;
    }
    // var baseUrl = 'https://' + bucket + '.s3.amazonaws.com/';
    var baseUrl = `https://s3.amazonaws.com/${bucket}`
    // Make sure the file object is mounted in a cfs
    var fileKey = storeFolder + "/" + self.collectionName + "/" + self._id + "-" + self.name();
    return baseUrl + fileKey;
  };


  if (Meteor.isClient) {
    let avatarStoreLarge = new FS.Store.S3("avatarsLarge", {
      bucket: "users.newspring.cc"
    });
    // let avatarStoreSmall = new FS.Store.S3("avatarsSmall");

    Avatars = new FS.Collection("avatars", {
      stores: [avatarStoreLarge],
      filter: {
        allow: {
          contentTypes: ["image/*"]
        }
      }
    })

  }

  if (Meteor.isServer) {


    let avatarStoreLarge = new FS.Store.S3("avatarsLarge", {
      accessKeyId: "AKIAJOFLGTDGGRVC24LA",
      secretAccessKey: "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",
      bucket: "users.newspring.cc",
      ACL: "public-read",
      // folder: "avatars"
      // transformWrite: function(fileObj, readStream, writeStream) {
      //   gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream)
      // }
    })

    let avatarStoreSmall = new FS.Store.S3("avatarsSmall", {
      accessKeyId: "ID-HERE",
      secretAccessKey: "ACCESS-KEY-HERE",
      bucket: "avatars.small",
      // beforeWrite: function(fileObj) {
      //   fileObj.size(20, {store: "avatarStoreSmall", save: false});
      // },
      // transformWrite: function(fileObj, readStream, writeStream) {
      //   gm(readStream, fileObj.name()).resize('20', '20').stream().pipe(writeStream)
      // }
    })


    Avatars = new FS.Collection("avatars", {
      stores: [avatarStoreLarge],
      filter: {
        allow: {
          contentTypes: ["image/*"]
        }
      }
    }).allow({
      "insert": function () {
        // add custom authentication code here
        return true;
      },
      "update": function () {
        // add custom authentication code here
        return true;
      }
    });
  }



}

export default Avatars
