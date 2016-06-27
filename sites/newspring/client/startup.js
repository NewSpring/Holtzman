// if (process.env.NATIVE) {
//   // this breaks is found on server
//   import Audio5 from "audio5"
//   window.Audio5 = Audio5;
// }
// //
// // Meteor.startup(() => {
// //   if (Meteor.isClient) {
// //
// //     (function(kitID) {
// //       if (!kitID) {
// //         return
// //       }
// //
// //       var config = {
// //         kitId: kitID
// //       };
// //       var d = false;
// //       var tk = document.createElement('script');
// //       tk.src = '//use.typekit.net/' + config.kitId + '.js';
// //       tk.type = 'text/javascript';
// //       tk.async = 'true';
// //       tk.onload = tk.onreadystatechange = function() {
// //         var rs = this.readyState;
// //         if (d || rs && rs != 'complete' && rs != 'loaded') return;
// //         d = true;
// //         try {Typekit.load(config);} catch (e) {}};
// //       var s = document.getElementsByTagName('script')[0];
// //       s.parentNode.insertBefore(tk, s);
// //     })(Meteor.settings.public.typekit);
// //
// //
// //     if (Meteor.settings.public.chartbeat) {
// //       window._sf_async_config = { uid: Meteor.settings.public.chartbeat, domain: 'native.newspring.cc', useCanonical: true };
// //       (function() {
// //         function loadChartbeat() {
// //           window._sf_endpt = (new Date()).getTime();
// //           var e = document.createElement('script');
// //           e.setAttribute('language', 'javascript');
// //           e.setAttribute('type', 'text/javascript');
// //           e.setAttribute('src','//static.chartbeat.com/js/chartbeat.js');
// //           document.body.appendChild(e);
// //         };
// //         var oldonload = window.onload;
// //         window.onload = (typeof window.onload != 'function') ?
// //           loadChartbeat : function() { oldonload(); loadChartbeat(); };
// //       })();
// //     }
// //
// //
// //     if (Meteor.settings.public.ga) {
// //       // Load Google Analytics
// //       (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
// //       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// //       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// //       })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
// //
// //       ga("create", Meteor.settings.public.ga, "auto");
// //       ga("send", "pageview");
// //     }
// //
// //     if (Meteor.settings.public.hotjar) {
// //       (function(h,o,t,j,a,r){
// //         h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
// //         h._hjSettings={hjid:Meteor.settings.public.hotjar,hjsv:5};
// //         a=o.getElementsByTagName('head')[0];
// //         r=o.createElement('script');r.async=1;
// //         r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
// //         a.appendChild(r);
// //       })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
// //     }
// //
// //   }
// //
// // })
