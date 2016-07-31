if (process.env.NATIVE) {
  // this breaks is found on server
  import Audio5 from "audio5"
  window.Audio5 = Audio5;

  // load droid
  function loadCSS(e,n,t){function i(e){return r.body?e():void setTimeout(function(){i(e)})}var o,r=window.document,a=r.createElement("link"),d=t||"all";if(n)o=n;else{var l=(r.body||r.getElementsByTagName("head")[0]).childNodes;o=l[l.length-1]}var f=r.styleSheets;a.rel="stylesheet",a.href=e,a.media="only x",i(function(){o.parentNode.insertBefore(a,n?o:o.nextSibling)});var s=function(e){for(var n=a.href,t=f.length;t--;)if(f[t].href===n)return e();setTimeout(function(){s(e)})};return a.addEventListener&&a.addEventListener("load",function(){this.media=d}),a.onloadcssdefined=s,s(function(){a.media!==d&&(a.media=d)}),a};
  loadCSS("https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic")

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

      if (Meteor.settings.public.hockey) {
        hockeyapp.start(null, null, Meteor.settings.public.hockey);
      }

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

      /* Quick and dirty implementation of scrolling to the top of the page
       * when tapping the status bar.
       *
       * For most content, we are able to
       * just scroll the main view to the top. To do this, we add
       * `data-status-scroll` to the main view, and use velocity to scroll it
       * to the top of the page.
       *
       * However, many of our views utilize absolute positioning for one reason
       * or another. Because of this, those items have scroll state outside of
       * the main view. For those, we must determine the item to be scrolled,
       * and the container in which the item exists and handles the scrolling.
       * For that case, we add `data-status-scroll-item` to the item, and
       * `data-status-scroll-container` to its container.
       *
       * It is also possible to set an offset using `data-status-scroll-offset`.
       */
      window.addEventListener("statusTap", (event) => {
        const options = {
          duration: 350,
          easing: "ease-in",
        };

        // this is the main view used by most content
        const $scroll = $("[data-status-scroll]");
        // this will be the absolutely positioned containers
        // there may be multiple
        const $containers = $("[data-status-scroll-container]");
        // this will be the items inside absolutely positioned containers
        // there may be multiple
        const $items = $("[data-status-scroll-item]");

        if ($items.length > 0 && $containers.length > 0) {
          // handle items inside positioned containers
          $items.map((i) => {
            const item = $items[i];

            const container = $containers[i];
            options.container = container;

            // use offset to account for headers and other stuff
            const offset = $(item).data("status-scroll-offset");
            if (offset) options.offset = offset;

            $(item).velocity("scroll", options);
          });
        } else {
          // most items will be inside the main view
          $scroll.velocity("scroll", options);
        }
      });
    });
  }
}

Meteor.startup(() => {
  if (Meteor.isClient) {

    (function(kitID) {
      if (!kitID) {
        return
      }

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
      window._sf_async_config = { uid: Meteor.settings.public.chartbeat, domain: window.location.hostname, useCanonical: true };
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

  }

})
