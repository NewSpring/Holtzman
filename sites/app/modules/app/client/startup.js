import "apollos/core/startup"

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
  catch (err) {
    window.open(url, '_blank', 'location=yes');
  }
}

function dismissSafari() {
  SafariViewController.hide()
}

if (Meteor.isCordova) {

  document.addEventListener("deviceready", function(){
    window.Lookback.setupWithAppToken(Meteor.settings.public.lookback);
    window.Lookback.shakeToRecord(true);
    window.open = cordova.InAppBrowser.open;

    document.addEventListener("click", (event) => {

      // aggressively get all clicks of <a></a> links in cordova
      let target = event.target;

      if (target.tagName != "A" && target.fastClickScrollParent) {
        target = target.fastClickScrollParent;
      } else if (
        target.tagName != "A" &&
        target.parentElement &&
        target.parentElement.tagName === "A"
      ) {
        target = target.parentElement;
      }

      if (!target.href || !target.host) {
        return;
      }

      // exterior link
      if (target.host != window.location.host) {
        event.preventDefault();
        event.stopPropagation();
        openUrl(target.href);
      }


    });

    window.addEventListener("statusTap", (event) => {
      $("[data-status-scroll]").velocity("scroll", { duration: 350, easing: "ease-in" });
    });
  });
}

if (Meteor.isClient) {

  (function(kitID) {
    var config = {
      kitId: kitID
    };
    var d = false;
    var tk = document.createElement('script');
    tk.src = '//use.typekit.net/' + config.kitId + '.js';
    tk.type = 'text/javascript';
    tk.async = 'true';
    tk.onload = tk.onreadystatechange = function() {
      var rs = this.readyState;
      if (d || rs && rs != 'complete' && rs != 'loaded') return;
      d = true;
      try {Typekit.load(config);} catch (e) {}};
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tk, s);
  })(Meteor.settings.public.typekit);

  if (Meteor.settings.public.chartbeat) {
    window._sf_async_config = { uid: Meteor.settings.public.chartbeat, domain: 'my.newspring.cc', useCanonical: true };
    (function() {
      function loadChartbeat() {
        window._sf_endpt = (new Date()).getTime();
        var e = document.createElement('script');
        e.setAttribute('language', 'javascript');
        e.setAttribute('type', 'text/javascript');
        e.setAttribute('src','//static.chartbeat.com/js/chartbeat.js');
        document.body.appendChild(e);
      };
      var oldonload = window.onload;
      window.onload = (typeof window.onload != 'function') ?
        loadChartbeat : function() { oldonload(); loadChartbeat(); };
    })();
  }


  if (Meteor.settings.public.ga) {
    // Load Google Analytics
    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");

    ga("create", Meteor.settings.public.ga, "auto");
    ga("send", "pageview");
  }

  if (Meteor.settings.public.hotjar) {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:Meteor.settings.public.hotjar,hjsv:5};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
  }

  if (Meteor.settings.public.sentry && typeof Raven != "undefined") {
    Raven.config(Meteor.settings.public.sentry).install()
  }

}
