/* global SafariViewController cordova */

import { Meteor } from "meteor/meteor";

function openUrl(url, opened, loaded, closed) {
  try {
    SafariViewController.isAvailable(available => {
      if (available) {
        SafariViewController.show({
          url,
          hidden: false,
          animated: true,
          transition: "curl",
          enterReaderModeIfAvailable: false,
          tintColor: "#6BAC43",
        },
            result => {
              if (result.event === "opened" && opened) {
                opened();
              } else if (result.event === "loaded" && loaded) {
                loaded();
              } else if (result.event === "closed" && closed) {
                closed();
              }
            },
            // error function?
            msg => {
              // eslint-disable-next-line no-console
              console.log(`KO: ${msg}`);
            });
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        window.open(url, "_blank", "location=yes");
      }
    });
  } catch (err) {
    window.open(url, "_blank", "location=yes");
  }
}

const inAppLink = e => {
  if (Meteor.isCordova) {
    if (SafariViewController || (cordova.InAppBrowser && cordova.InAppBrowser.open)) {
      e.preventDefault();
      e.stopPropagation();
      openUrl(e.currentTarget.href);
    }
  }
};


const linkListener = event => {
  // aggressively get all clicks of <a></a> links in cordova
  let target = event.target;

  if (target.tagName !== "A" && target.fastClickScrollParent) {
    target = target.fastClickScrollParent;
  } else if (
    target.tagName !== "A" &&
    target.parentElement &&
    target.parentElement.tagName === "A"
  ) {
    target = target.parentElement;
  }

  if (!target.href || !target.host) {
    return;
  }

  // exterior link
  if (target.host !== window.location.host) {
    event.preventDefault();
    event.stopPropagation();
    openUrl(target.href);
  }
};

export default inAppLink;

export {
  openUrl,
  linkListener,
};
