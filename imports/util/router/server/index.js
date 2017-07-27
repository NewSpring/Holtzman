/* eslint-disable no-underscore-dangle, no-param-reassign */
import { match, createMemoryHistory, RouterContext } from "react-router";
import compress from "compression";
import cookieParser from "cookie-parser";
import { StyleSheetServer } from "aphrodite";
import ReactHelmet from "react-helmet";
import Cheerio from "cheerio/lib/cheerio";
import ReactDOMServer from "react-dom/server";
import { getDataFromTree } from "react-apollo";
import { GraphQL } from "../../../data/graphql";
import InjectData from "./inject-data";
import SSRContext from "./context";
import patchSubscribeData from "./data";

const ReactRouterSSR = {};
const cache = {}; // in memory cache of static markup
const CACHE_TTL = Meteor.settings.cacheTTL || 300000; // 5 minutes in milliseconds

// creating some EnvironmentVariables that will be used later on
ReactRouterSSR.ssrContext = new Meteor.EnvironmentVariable();
ReactRouterSSR.inSubscription = new Meteor.EnvironmentVariable();

// meteor algorithm to check if this is a meteor serving http request or not
function isAppUrl({ url }) {
  if (url === "/favicon.ico" || url === "/robots.txt") return false;
  if (url === "/app.manifest") return false;
  // Avoid serving app HTML for declared routes such as /sockjs/.
  if (typeof RoutePolicy !== "undefined" && RoutePolicy.classify(url)) {
    return false;
  }
  return true;
}

function addInjectData(res, data) {
  const condition = res._injectPayload && !res._injected;
  if (condition) {
    // inject data
    const payload = InjectData._encode(res._injectPayload);
    data = data.replace("</body>", `<script type="text/inject-data">${payload}</script></body>`);

    res._injected = true;
    return data;
  }
  return data;
}

// Thank you FlowRouter for this wonderful idea :)
// https://github.com/kadirahq/flow-router/blob/ssr/server/route.js
function moveScripts(data) {
  const $ = Cheerio.load(data, { decodeEntities: false });
  const heads = $("head script").not("[data-ssr-ignore=\"true\"]");
  const bodies = $("body script").not("[data-ssr-ignore=\"true\"]");
  $("body").append([...heads, ...bodies]);

  // Remove empty lines caused by removing scripts
  $("head").html($("head").html().replace(/(^[ \t]*\n)/gm, ""));
  $("body").html($("body").html().replace(/(^[ \t]*\n)/gm, ""));
  return $.html();
}

function moveStyles(data) {
  const $ = Cheerio.load(data, { decodeEntities: false });
  const styles = $("head link[type=\"text/css\"]").not("[data-ssr-ignore=\"true\"]");
  $("head").append(styles);

  // Remove empty lines caused by removing scripts
  $("head").html($("head").html().replace(/(^[ \t]*\n)/gm, ""));
  return $.html();
}

const _getCacheKey = (url) => `${Meteor.userId()}::${url}`;

function generateSSRData(serverOptions, req, res, renderProps, history) {
  let html;
  let css;
  let head;

  // we're stealing all the code from FlowRouter SSR
  // https://github.com/kadirahq/flow-router/blob/ssr/server/route.js#L61
  const ssrContext = new SSRContext();
  ReactRouterSSR.ssrContext.withValue(ssrContext, () => {
    try {
      const frData = InjectData.getData(res, "fast-render-data");
      if (frData) ssrContext.addData(frData.collectionData);

      renderProps = { ...renderProps, ...serverOptions.props };

      // If using redux, create the store.
      let reduxStore;
      if (typeof serverOptions.createReduxStore !== "undefined") {
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
        app = (
          <serverOptions.wrapper {...wrapperProps}>
            {app}
          </serverOptions.wrapper>
        );
      }

      // Do the rendering.
      const renderedData = StyleSheetServer.renderStatic(() => {
        Promise.awaitAll([getDataFromTree(app)]);
        return ReactDOMServer.renderToString(app);
      });

      html = renderedData.html;
      css = renderedData.css;

      if (css) {
        InjectData.pushData(res, "aphrodite-classes", JSON.stringify(css));
      }

      head = ReactHelmet.rewind();

      // If using redux, pass the resulting redux state to the client so that it
      // can hydrate from there.
      if (reduxStore) {
        // inject-data accepts raw objects and calls JSON.stringify() on them,
        // but the _.each() done in there does not play nice if the store contains
        // ImmutableJS data. To avoid that, we serialize ourselves.
        InjectData.pushData(res, "redux-initial-state", JSON.stringify(reduxStore.getState()));
      }

      // I'm pretty sure this could be avoided in a more elegant way?
      const context = FastRender.frContext.get();
      const data = context.getData();
      InjectData.pushData(res, "fast-render-data", data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(new Date(), "error while server-rendering", err.stack);
    }
  });

  return { html, css, head };
}

function patchResWrite(serverOptions, originalWrite, css, html, head, req, res) {
  const cacheKey = _getCacheKey(req.url);

  return function patch(data) {
    if (typeof data === "string" && data.indexOf("<!DOCTYPE html>") === 0) {
      data = addInjectData(res, data);
      data = moveStyles(data);
      data = moveScripts(data);

      if (css) {
        data = data.replace("</head>", `<style data-aphrodite>${css.content}</style></head>`);
      }

      if (head) {
        // Add react-helmet stuff in the header (yay SEO!)
        data = data.replace(
          "<head>",
          `<head>${head.title}${head.base}${head.meta}${head.link}${head.script}`
        );
      }

      data = data.replace(
        "<body>",
        `<body><!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${Meteor.settings.public.gtm}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) --><div id="react-app">${html}</div>`
      );
    }

    // store in cache based on user id and url
    // when user not logged in, it should be undefined
    // this should be fine as all logged out users should see the same
    cache[cacheKey] = {
      data,
      timeout: setTimeout(() => {
        delete cache[cacheKey];
      }, CACHE_TTL),
    };

    originalWrite.call(this, data);
  };
}

function sendSSRHtml(serverOptions, req, res, next, renderProps, history) {
  const cacheKey = _getCacheKey(req.url);

  function quickWrite(originalWrite) {
    return function write() {
      originalWrite.call(this, cache[cacheKey].data);
    };
  }
  // if there is cached data and it's not expired
  if (cache[cacheKey]) {
    res.write = quickWrite(res.write); // eslint-disable-line
    next();
    return;
  }

  const { css, html, head } = generateSSRData(serverOptions, req, res, renderProps, history);
  // eslint-disable-next-line no-param-reassign
  res.write = patchResWrite(serverOptions, res.write, css, html, head, req, res);

  next();
}

export default function run(routes, serverOptions = {}) {
  // this line just patches Subscribe and find mechanisms
  patchSubscribeData(ReactRouterSSR);

  Meteor.bindEnvironment(() => {
    // Parse cookies for the login token
    WebApp.rawConnectHandlers.use(cookieParser());
    WebApp.rawConnectHandlers.use(compress());

    // eslint-disable-next-line
    WebApp.connectHandlers.use(
      Meteor.bindEnvironment((req, res, next) => {
        if (!isAppUrl(req)) return next();

        const loginToken = req.cookies.meteor_login_token;

        if (!GraphQL.networkInterface._opts.headers) {
          GraphQL.networkInterface._opts.headers = new fetch.Headers();
        }
        if (loginToken) {
          GraphQL.networkInterface._opts.headers.Authorization = loginToken;
        } else {
          delete GraphQL.networkInterface._opts.headers.Authorization;
        }

        const headers = req.headers;
        const context = new FastRender._Context(loginToken, { headers });

        FastRender.frContext.withValue(context, () => {
          const history = createMemoryHistory(req.url);

          match(
            { history, routes, location: req.url },
            Meteor.bindEnvironment((err, redirectLocation, renderProps) => {
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
                  Location: redirectLocation.pathname + redirectLocation.search,
                });
                res.end();
              } else if (renderProps) {
                sendSSRHtml(serverOptions, req, res, next, renderProps, history);
                try {
                  GraphQL.store.dispatch({ type: "RESET" }); // reset store after each query
                } catch (e) {
                  /* console.error(e); */
                }
              } else {
                res.writeHead(404);
                res.write("Not found");
                res.end();
              }
            })
          );
        });
      })
    );
  })();
}

/*

  Utilities

*/
