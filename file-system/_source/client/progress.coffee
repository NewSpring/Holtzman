

Apollos.Controls or= {}

class Apollos.Controls.UploadProgress extends Apollos.Component

  @register "Apollos.Controls.UploadProgress"


  vars: -> [
    file: false
  ]

  onCreated: ->

    file = @.data()?.file

    if not file
      return

    @.file.set(file)


  progress: ->

    file = @.file.get()

    progressFunc = -> 0

    if file instanceof FS.File
      progressFunc = ->
        file.uploadProgress()
    else
      progressFunc = ->
        Apollos.fs.uploadQueue.progress()


    return progressFunc()
