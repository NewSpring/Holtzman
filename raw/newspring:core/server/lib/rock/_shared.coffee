Rock.tokenName = Meteor.settings.rock.tokenName
Rock.baseURL = Meteor.settings.rock.baseURL
Rock.token = Meteor.settings.rock.token

# If Rock is being watched (aka old states), remove watching
if serverWatch.getKeys().indexOf(Rock.name) isnt -1
  serverWatch.stopWatching Rock.name

# Start watching again
serverWatch.watch Rock.name, Rock.baseURL, 30 * 1000

###

  Rock.apiRequest

  @example make an API call to Rock

    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err

      console.log data

  @param method [String] CRUD Method desired
  @param resource [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response

###
Rock.apiRequest = (method, resource, data, callback) ->

  if not Rock.isAlive()
    # build queue system herenot
    return

  if typeof data is "function"
    callback = data
    data = undefined

  headers = {}

  if Rock.tokenName and Rock.token
    headers[Rock.tokenName] = Rock.token

  debug "Sending #{method} to #{Rock.baseURL}#{resource.substring(0, 25)}..."

  HTTP.call method, "#{Rock.baseURL}#{resource}",
    timeout: 3000
    headers: headers
    data: data
  , callback


###

  Rock.refreshEntity

  @example refesh the users collection from Rock

    Rock.refreshEntity "api/UserLogins", "user", "users", throwErrors

  @param endpoint [String] API enpoint on Rock
  @param entityName [String] The singular name of an entity (ie person, user)
  @param apollosCollection [String] The plural name of an entity (ie people,
    users)
  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.refreshEntity = (endpoint, entityName, apollosCollection, throwErrors) ->

  Rock.apiRequest "GET", endpoint, (error, result) ->
    if error
      message = "#{endpoint.substring(0, 25)}...: #{error}"
      errorType = "Rock sync issue"

      if throwErrors
        throw new Meteor.Error errorType, message
      else
        debug errorType
        debug message

      return

    rockModels = result.data
    docIdsSynced = []

    for model in rockModels
      docId = Apollos[entityName].update model, Rock.name
      debug "Synced #{entityName} from Rock: #{model.Id}"

      if docId
        docIdsSynced.push docId

    docsRockDoesNotHave = Apollos[apollosCollection].find
      _id:
        $nin: docIdsSynced

    for doc in docsRockDoesNotHave.fetch()
      Rock[entityName].create doc
