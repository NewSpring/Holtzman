Meteor.subscribe "userData"
personHandle = null

Accounts.onLogin ->
  if personHandle
    personHandle.stop()

  personHandle = Meteor.subscribe "personAndFamilyGroup"
