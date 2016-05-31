/*global Meteor */

const upload = (id, callback) => {
  Meteor.call("file/upload/avatar", id, callback)
}

export default upload
