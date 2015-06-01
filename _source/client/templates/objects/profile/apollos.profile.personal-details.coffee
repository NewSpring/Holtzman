class Apollos.Profile.PersonalDetails extends Apollos.Component
  @register "Apollos.Profile.PersonalDetails"

  vars: -> [
    hasErrors: false
  ]

  onCreated: ->

    @.parent().title?.set "Personal Details"

  onRendered: ->

    @.parent().checkForValidated()

  campuses: -> [
    {
      name: "Greenville"
      val: 8
    }
    {
      name: "Anderson"
      val: 7
    }
    {
      name: "Greenwood"
      val: 9
    }
    {
      name: "Florence"
      val: 10
    }
  ]



