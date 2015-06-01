class Apollos.Profile.PaymentDetails extends Apollos.Component
  @register "Apollos.Profile.PaymentDetails"

  vars: -> [
    hasErrors: false
    bank: true
  ]

  onRendered: ->

    @.parent().title?.set "Payment Details"
    @.parent().disabled.set true
