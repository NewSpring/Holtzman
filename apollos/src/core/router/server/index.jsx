import { match, Router, createMemoryHistory } from "react-router";
import Compress from "compression";
import CookieParser from "cookie-parser";
import Url from "url";

import sendSSRHtml from "./render"

// meteor algorithm to check if this is a meteor serving http request or not
function IsAppUrl(req) {

  var url = req.url
  if(url === '/favicon.ico' || url === '/robots.txt') {
    return false;
  }

  // NOTE: app.manifest is not a web standard like favicon.ico and
  // robots.txt. It is a file name we have chosen to use for HTML5
  // appcache URLs. It is included here to prevent using an appcache
  // then removing it from poisoning an app permanently. Eventually,
  // once we have server side routing, this won't be needed as
  // unknown URLs with return a 404 automatically.
  if(url === '/app.manifest') {
    return false;
  }

  // Avoid serving app HTML for declared routes such as /sockjs/.
  // if (RoutePolicy.classify(url)) {
  //   return false;
  // }

  return true;
}


let webpackStats;
export function loadWebpackStats(stats) {
  webpackStats = stats;
}

// XXX refactor into non meteor specific SSR/SSH solution
// OR write ^^ and replace this with it
export function run(routes, clientOptions = {}, serverOptions = {}) {

  if (!serverOptions.webpackStats) {
    serverOptions.webpackStats = webpackStats;
  }

  Meteor.bindEnvironment(() => {

    // Parse cookies for the login token
    WebApp.rawConnectHandlers.use(CookieParser());

    if (!serverOptions.dontCompress) {
      WebApp.rawConnectHandlers.use(Compress())
    }

    WebApp.connectHandlers.use(Meteor.bindEnvironment((req, res, next) => {
      let now = new Date();
      if (!IsAppUrl(req)) {
        next();
        return;
      }

      const context = new FastRender._Context(loginToken, { headers });
      let history = createMemoryHistory(req.url);

      if (typeof serverOptions.historyHook === 'function') {
        history = serverOptions.historyHook(history);
      }

      const loginToken = req.cookies['meteor_login_token'];
      const headers = req.headers;

      const originalUserId = Meteor.userId;
      const originalUser = Meteor.user;

      // This should be the state of the client when we remount the app
      Meteor.userId = () => context.userId;
      Meteor.user = () => undefined;

      match({ history, routes, location: req.url }, Meteor.bindEnvironment((
        err,
        redirectLocation,
        renderProps
      ) => {

        if (err) {
          res.writeHead(500);
          res.write(err.messages);
          res.end();
        } else if (req.url === "/_/ping") {
          res.writeHead(200);
          res.write("PONG");
          res.end();
        } else if (redirectLocation) {
          res.writeHead(302, {
            Location: redirectLocation.pathname + redirectLocation.search
          });
          res.end();
        } else if (renderProps) {
          sendSSRHtml(
            clientOptions,
            serverOptions,
            context,
            req,
            res,
            next,
            renderProps,
            history
          );
          let finished = new Date();
          console.log(finished - now);
        } else {
          res.writeHead(404);
          res.write('Not found');
          res.end();
        }

      }));

      Meteor.userId = originalUserId;
      Meteor.user = originalUser;

    }));

  })();

}
