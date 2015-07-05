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

Apollos.formatters =

  toCurrency: (num) ->
    "$#{num.toFixed(2).replace /(\d)(?=(\d{3})+\.)/g, '$1,'}"

  toDateString: (dateObj, abbreviated) ->
    year = dateObj.getFullYear()
    date = dateObj.getDate()
    month = dateObj.getMonth()
    monthName = monthNames[month]

    if abbreviated
      monthName = monthName.substring 0, 3

    return "#{monthName} #{date}, #{year}"
