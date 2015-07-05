Apollos.formatters =

  toCurrency: (num) ->
    "$#{num.toFixed(2).replace /(\d)(?=(\d{3})+\.)/g, '$1,'}"
