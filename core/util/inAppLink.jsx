
const inAppLink = (e) => {
  if (Meteor.isCordova) {
    if (cordova.InAppBrowser && cordova.InAppBrowser.open) {
      e.preventDefault()
      cordova.InAppBrowser.open(e.currentTarget.href, "_blank")
    }
  }
}

export default inAppLink
