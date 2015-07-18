

###

  Apollos.format

###
Apollos.format = {}


Apollos.format._addUtil = (name, handler) ->

  if Apollos.format[name]
    throw new Apollos.Error("Format function #{name} is already registered")
    return

  if not handler or typeof handler isnt "function"
    throw new Apollos.Error("Format: #{name} requires a function")
    return

  Apollos.format[name] = handler

  return



###

  toCurrency

  @param platform [Number] convert a number into American Currency

###
toCurrency = (num) ->
  return "$#{num.toFixed(2).replace /(\d)(?=(\d{3})+\.)/g, '$1,'}"

Apollos.format._addUtil("toCurrency", toCurrency)



###

  toDateString

###
monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

toDateString = (dateObj, abbreviated) ->
  year = dateObj.getFullYear()
  date = dateObj.getDate()
  month = dateObj.getMonth()
  monthName = monthNames[month]

  if abbreviated
    monthName = monthName.substring 0, 3

  return "#{monthName} #{date}, #{year}"


Apollos.format._addUtil("toDateString", toDateString)
