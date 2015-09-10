

###

  Apollos.fs.upload

###
Apollos.fs.upload = (fsName, event, callback) ->

  if not Apollos.fs[fsName]
    throw new Apollos.Error(
      "No file system collection found under the name #{fsName}"
    )
    return

  if not event
    throw new Apollos.Error(
      "File event is required to upload to #{fsName}"
    )
    return

  if not callback or typeof callback isnt "function"
    callback = -> return

  Apollos.fs.parse(event, (file) ->

    if not file
      callback(new Apollos.Error("no file found on upload to #{fsName}"))
      return

    newFile = Apollos.fs.file(file)

    Apollos.fs[fsName].insert(newFile, callback)

  )


Apollos.fs.uploadQueue = FS.HTTP.uploadQueue
