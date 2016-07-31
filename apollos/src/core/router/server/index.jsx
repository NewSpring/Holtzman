import { match, Router, createMemoryHistory, RouterContext } from "react-router";
import Compress from "compression";
import CookieParser from "cookie-parser";
import Url from "url";
import { StyleSheetServer } from "aphrodite";
import ReactHelmet from "react-helmet";
import Cheerio from "cheerio/lib/cheerio";
import MinReact from "react/dist/react.min";
const ReactDOMServer = MinReact.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
import { getDataFromTree } from "react-apollo/server";

import { GraphQL } from "../../graphql";
import InjectData from "./inject-data";
import SSRContext from './context';
import patchSubscribeData from './data';

// meteor algorithm to check if this is a meteor serving http request or not
function IsAppUrl({ url }) {
  if (url === '/favicon.ico' || url === '/robots.txt') return false;
  if (url === '/app.manifest') return false;
  // Avoid serving app HTML for declared routes such as /sockjs/.
  if (typeof RoutePolicy !== "undefined" && RoutePolicy.classify(url)) {
    return false;
  }
  return true;
}

const ReactRouterSSR = {};
let cache = {}; // in memory cache of static markup
const CACHE_TTL = Meteor.settings.cacheTTL || 300000; // 5 minutes in milliseconds

// creating some EnvironmentVariables that will be used later on
ReactRouterSSR.ssrContext = new Meteor.EnvironmentVariable();
ReactRouterSSR.inSubscription = new Meteor.EnvironmentVariable();

export function run(routes, serverOptions = {}) {
  // this line just patches Subscribe and find mechanisms
  patchSubscribeData(ReactRouterSSR);

  Meteor.bindEnvironment(() => {

    // Parse cookies for the login token
    WebApp.rawConnectHandlers.use(CookieParser());
    WebApp.rawConnectHandlers.use(Compress())

    WebApp.connectHandlers.use(Meteor.bindEnvironment((req, res, next) => {
      if (!IsAppUrl(req)) return next();

      const loginToken = req.cookies['meteor_login_token'];
      const headers = req.headers;
      const context = new FastRender._Context(loginToken, { headers });

      GraphQL.networkInterface.use([{
        applyMiddleware(request, next) {
          const currentUserToken = loginToken;
          if (!currentUserToken) return next();
          if (!request.options.headers) request.options.headers = new fetch.Headers();
          request.options.headers.Authorization = currentUserToken;
          next();
        },
      }])

      FastRender.frContext.withValue(context, function() {
        const history = createMemoryHistory(req.url);

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
            sendSSRHtml(serverOptions, req, res, next, renderProps, history);
          } else {
            res.writeHead(404);
            res.write('Not found');
            res.end();
          }

        }));
      });
    }));
  })();
};

function sendSSRHtml(serverOptions, req, res, next, renderProps, history) {
  const cacheKey = _getCacheKey(req.url);

  function quickWrite(originalWrite) {
    return function(data) { originalWrite.call(this, cache[cacheKey].data); };
  }
  // if there is cached data and it's not expired
  if (cache[cacheKey]) {
    res.write = quickWrite(res.write);
    next();
    return;
  }

  const { css, html, head } = generateSSRData(serverOptions, req, res, renderProps, history);
  res.write = patchResWrite(serverOptions, res.write, css, html, head, req, res);

  next();
}

function patchResWrite(serverOptions, originalWrite, css, html, head, req, res) {
  const cacheKey = _getCacheKey(req.url);

  return function(data) {
    if (typeof data === "string" && data.indexOf("<!DOCTYPE html>") === 0) {
      data = addInjectData(res, data)
      data = moveStyles(data);
      data = moveScripts(data);

      if (css) {
        data = data.replace("</head>",
          `<style data-aphrodite>${css.content}</style></head>`
        );
      }

      if (head) {
        // Add react-helmet stuff in the header (yay SEO!)
        data = data.replace("<head>",
          `<head>${head.title}${head.base}${head.meta}${head.link}${head.script}`
        );
      }

      data = data.replace("<body>", `<body><div id="react-app">${html}</div>`);
    }

    // store in cache based on user id and url
    // when user not logged in, it should be undefined
    // this should be fine as all logged out users should see the same
    cache[cacheKey] = { data: data, timeout: setTimeout(() => {
      delete cache[cacheKey]
    }, CACHE_TTL)};

    originalWrite.call(this, data);
  }
}

function generateSSRData(serverOptions, req, res, renderProps, history) {
  let html, css, head;

  // we're stealing all the code from FlowRouter SSR
  // https://github.com/kadirahq/flow-router/blob/ssr/server/route.js#L61
  const ssrContext = new SSRContext();
  ReactRouterSSR.ssrContext.withValue(ssrContext, () => {
    try {
      const frData = InjectData.getData(res, 'fast-render-data');
      if (frData) ssrContext.addData(frData.collectionData);

      renderProps = { ...renderProps, ...serverOptions.props };

      // If using redux, create the store.
      let reduxStore;
      if (typeof serverOptions.createReduxStore !== 'undefined') {
        // Create the store, with no initial state.
        reduxStore = serverOptions.createReduxStore(undefined, history);
      }

      // Wrap the <RouterContext> if needed before rendering it.
      let app = <RouterContext {...renderProps} />;
      if (serverOptions.wrapper) {
        const wrapperProps = serverOptions.wrapperProps || {};
        // Pass the redux store to the wrapper, which is supposed to be some
        // flavour of react-redux's <Provider>.
        if (reduxStore) {
          wrapperProps.store = reduxStore;
        }
        app = <serverOptions.wrapper {...wrapperProps}>{app}</serverOptions.wrapper>;
      }

      // Do the rendering.
      const renderedData = StyleSheetServer.renderStatic(function() {
        Promise.awaitAll([getDataFromTree(app)]);
        return ReactDOMServer.renderToString(app)
      });

      html = renderedData.html;
      css = renderedData.css;

      if (css) {
        InjectData.pushData(res, 'aphrodite-classes', JSON.stringify(css));
      }

      head = ReactHelmet.rewind();

      // If using redux, pass the resulting redux state to the client so that it
      // can hydrate from there.
      if (reduxStore) {
        // inject-data accepts raw objects and calls JSON.stringify() on them,
        // but the _.each() done in there does not play nice if the store contains
        // ImmutableJS data. To avoid that, we serialize ourselves.
        InjectData.pushData(res, 'redux-initial-state', JSON.stringify(reduxStore.getState()));
      }

      // I'm pretty sure this could be avoided in a more elegant way?
      const context = FastRender.frContext.get();
      const data = context.getData();
      InjectData.pushData(res, 'fast-render-data', data);
    }
    catch(err) {
      console.error(new Date(), 'error while server-rendering', err.stack);
    }
  });

  return { html, css, head };
}


/*

  Utilities

*/

function addInjectData(res, data) {
  let condition = res._injectPayload && !res._injected;
  if (condition) {
    // inject data
    let payload = InjectData._encode(res._injectPayload);
    data = data.replace('</body>', `<script type="text/inject-data">${payload}</script></body>`);

    res._injected = true;
    return data
  }
  return data
}

// Thank you FlowRouter for this wonderful idea :)
// https://github.com/kadirahq/flow-router/blob/ssr/server/route.js
function moveScripts(data) {
  const $ = Cheerio.load(data, { decodeEntities: false });
  const heads = $("head script").not(`[data-ssr-ignore="true"]`);
  $("body").append(heads);

  // Remove empty lines caused by removing scripts
  $("head").html($("head").html().replace(/(^[ \t]*\n)/gm, ""));
  return $.html();
}

function moveStyles(data) {
  const $ = Cheerio.load(data, { decodeEntities: false });
  const styles = $(`head link[type="text/css"]`).not(`[data-ssr-ignore="true"]`);
  $("head").append(styles);

  // Remove empty lines caused by removing scripts
  $("head").html($("head").html().replace(/(^[ \t]*\n)/gm, ""));
  return $.html();
}

const _getCacheKey = (url) => (Meteor.userId() + "::" + url);
