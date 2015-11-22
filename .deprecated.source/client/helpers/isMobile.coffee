Apollos.isMobile = ->

  regex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  userAgent = navigator.userAgent
  return regex.test(userAgent)

Template.registerHelper "isMobile", Apollos.isMobile
