/*global Meteor */

const upload = (file, callback) => {
  Meteor.call("file/upload", file, callback)
}

export default upload
