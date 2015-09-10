
###

  Apollos.utilities

###
Apollos.fs = {}


# bind the reading of events and parsing of files
Apollos.fs.parse = FS.Utility.eachFile


Apollos.fs.file = (file) ->

  if not file
    throw new Apollos.Error("file is required")

  return new FS.File(file)



_s3 = (name, options) ->

  if Meteor.isServer
    if not Meteor.settings.s3
      throw new Apollos.Error("S3 keys are required for creating store #{name}")
      return

    s3Creds = Meteor.settings.s3

    options or= {}
    options.accessKeyId or= s3Creds.AWSAccessKeyId
    options.secretAccessKey or= s3Creds.AWSSecretAccessKey
    options.bucket or= s3Creds.AWSBucket

    store = new FS.Store.S3(name, options)

    return store

  if Meteor.isClient
    store = new FS.Store.S3(name)

    return store



Apollos.fs._generateStore = (name, options, type) ->

  if Apollos.fs[name]
    throw new Apollos.Error("File Store #{name} is already registered")
    return

  if typeof options is "string"
    type = options
    options = {}

  type or= "s3"

  store = {}

  if type is "s3"
    store = _s3(name, options)


  return store



Apollos.fs._generateCollection = (name, options, type) ->

  if Apollos.fs[name]
    throw new Apollos.Error("File Store #{name} is already registered")
    return

  if typeof options is "string"
    type = options
    options = {}

  type or= "s3"

  options or= {}
  options.store or= {}
  storeOptions = options.store
  delete options.store

  options.stores or= []
  options.stores = options.stores.concat([
    Apollos.fs._generateStore(name, storeOptions, type)
  ])

  Apollos.fs[name] = new FS.Collection(name, options)
