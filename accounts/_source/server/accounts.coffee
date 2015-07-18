###

  Create a person from a new user

###
Accounts.onCreateUser (options, user) ->

  if options.profile
    user.profile = options.profile

  if user.profile?.guest is true
    return user

  person = Apollos.person user

  # # no existing user so create one
  if not Object.keys(person).length
    if not user.personGuid
      user.personGuid = Apollos.utilities.makeNewGuid()

    Apollos.people.upsert({guid: user.personGuid}, {
      $set:
        preferredEmail: user.emails[0].address
    })

  return user
