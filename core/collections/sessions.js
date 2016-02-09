/*

  This is a rudimentary attempt at an in memory session
  for users conncted. The primary use case is for creating sessions
  to be used in page tracking with Rock

  {
    "IpAddress": String,
    "Guid": Guid,
  }
*/

let sessions;
if (Meteor.isServer) {

  sessions = new Mongo.Collection(null)

  // bind connection starts and ends
  Meteor.onConnection((connection) => {

    let ip = connection.ip

    if (connection.httpHeaders && connection.httpHeaders["x-forwarded-for"]) {
      ip = connection.httpHeaders["x-forwarded-for"]
    }

    // on a connection, insert the connection details
    sessions.insert({
      _id: connection.id,
      ip,
      userId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, (err, id) => {

      connection.onClose(() => {
        sessions.remove(id)
      })

    })

  })

  // Dummy publish for this.userId
  Meteor.publish("apollos-session-dummy", function(){

    sessions.update(this.connection.id, {
      $set: {
        userId: this.userId,
        updatedAt: new Date()
      }
    // async
    }, (err, update) => {})

    return []

  })

}

if (Meteor.isClient) {
  Meteor.subscribe("apollos-session-dummy")
}


export default sessions
