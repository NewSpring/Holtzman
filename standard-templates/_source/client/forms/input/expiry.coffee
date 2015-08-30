class Apollos.Forms.ExpiryInput extends Apollos.Forms.Input

  @register "Apollos.Forms.ExpiryInput"

  getValue: ->

    value = Expiry.parse(@.find("input"))
    return

  validate: (value) ->
    split = value.split("/")
    month = split[0]
    year = split[1]

    if not month and not year
      return false

    if Number(month) > 12
      return false

    now = new Date()
    now = now.getFullYear()

    now = "#{now}".replace("20", "")

    if Number(year) < Number(now)
      return false

    return true


  setValue: (value) ->

    @.value.set value

    if value
      @.find("input").value = value
      return
