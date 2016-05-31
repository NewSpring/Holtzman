function openUrl(url) {
  try {
    SafariViewController.isAvailable(function (available) {
      if (available) {
        SafariViewController.show({
              url: url,
              hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
              animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
              transition: 'curl', // unless animated is false you can choose from: curl, flip, fade, slide (default)
              enterReaderModeIfAvailable: false, // default false
              tintColor: "#6BAC43" // default to ios blue
            },
            // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
            function(result) {
              if (result.event === 'opened') {
                // view has opened
              } else if (result.event === 'loaded') {
                // view has loaded
              } else if (result.event === 'closed') {
                // view has closed
              }
            },
            // error function?
            function(msg) {
              alert("KO: " + msg);
            })
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        window.open(url, '_blank', 'location=yes');
      }
    })
  }
  catch(err) {
    window.open(url, '_blank', 'location=yes');
  }
}

const inAppLink = (e) => {
  if (Meteor.isCordova) {
    if (SafariViewController || (cordova.InAppBrowser && cordova.InAppBrowser.open)) {
      e.preventDefault()
      e.stopPropagation();
      openUrl(e.currentTarget.href);
    }
  }
}

export default inAppLink
