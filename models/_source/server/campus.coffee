Apollos.campus = {}

###

  Apollos.campus.translate

  @example take data from a service and format it for Apollos

    Apollos.campus.translate([obj, platform])

  @param campus [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.campus.translate = (campus, platform) ->
  return Apollos.documentHelpers.translate "campus", campus, platform


###

  Apollos.campus.update

  @example update a campus in apollos with data from another service

    Apollos.campus.update([obj, platform])

  @param campus [Object] existing campus from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.campus.update = (campus, platform) ->
  return Apollos.documentHelpers.update "campus", "campuses", campus, platform

###

  Apollos.campus.delete

  @example take a campus and delete it

    Apollos.campus.delete(user, [platform])

  @param campus [Object|String|Number] existing document, _id
  @param platform [String] platform initiating the delete

###
Apollos.campus.delete = (campus, platform) ->
  Apollos.documentHelpers.delete "campus", "campuses", campus, platform
  
