/*global Meteor */

const upload = (file, callback) => {
  let url = `ImageUploader.ashx?isBinaryFile=True&IsTemporary=False&fileId=46&FileTypeGuid=03BD8476-8A9F-4078-B628-5B538F967AFC`
  url = "http://core-rock.newspring.cc/" + url
  let body = new FormData()

  body.append("images", file)

  const response = fetch(url, {
    method: "POST",
    body,
    mode: "no-cors"
  })
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })
  // Meteor.call("file/upload/avatar", file, callback)
}

export default upload
