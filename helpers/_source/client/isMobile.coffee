
isMobile = ->

  regex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  userAgent = navigator.userAgent
  return regex.test(userAgent)

Apollos.helpers._addHelper "isMobile", isMobile
