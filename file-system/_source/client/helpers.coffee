
_fs = {}

Template.registerHelper "FS", _fs

_fs.GetFile = (collectionName, id) ->

  collection = Apollos.fs[collectionName]
  return if collection then collection.findOne(id) else null


_fs.UploadProgress = (file) ->

  if file instanceof FS.File
    progressFunc = ->
      file.uploadProgress()
  else
    progressFunc = ->
      Apollos.uploadQueue.progress()

  return progressFunc()
