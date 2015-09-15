Apollos.helpers or= {}

Apollos.helpers.frequencies = ->
  [
    "Once"
    "Week"
    "2 weeks"
    "1st & 15th"
    "Month"
    "Quarter"
    "6 months"
    "Year"
  ]

Apollos.helpers.getInterval = (frequency, start) ->

  if frequency and Apollos.validate.isGuid frequency
    definedValue = Apollos.definedValues.findOne
      definedValueGuid: new RegExp(frequency, "i")
    frequency = definedValue?.value

  if not frequency
    return null

  frequency = Apollos.helpers.translateFrequency frequency
  start or= moment().startOf "day"

  switch frequency
    when "once"
      return moment(start).recur(start)
    when "week"
      return moment(start).recur().every(1).weeks()
    when "2 weeks"
      return moment(start).recur().every(2).weeks()
    when "1st & 15th"
      return moment(start).recur().every([1,15]).daysOfMonth()
    when "month"
      return moment(start).recur().every(1).months()
    when "quarter"
      return moment(start).recur().every(3).months()
    when "6 months"
      return moment(start).recur().every(6).months()
    when "year"
      return moment(start).recur().every(1).years()

  return null

Apollos.helpers.translateFrequency = (value) ->
  switch value.toLowerCase()
    when "one-time" then return "once"
    when "weekly" then return "week"
    when "bi-weekly" then return "2 weeks"
    when "twice a month" then return "1st & 15th"
    when "monthly" then return "month"
    when "quarterly" then return "quarter"
    when "twice a year" then return "6 months"
    when "yearly" then return "year"

  return value.toLowerCase()
