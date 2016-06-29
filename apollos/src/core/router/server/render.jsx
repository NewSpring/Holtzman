import { RouterContext } from "react-router";
import { StyleSheetServer } from "aphrodite";
import ReactHelmet from "react-helmet";
import Cheerio from "cheerio/lib/cheerio";
import MinReact from "react/dist/react.min";
const ReactDOMServer = MinReact.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
import InjectData from "./inject-data";

let cache = {}; // in memory cache of static markup
const CACHE_TTL = Meteor.settings.cacheTTL || 300000; // 5 minutes in milliseconds

function fetchComponentData(renderProps, reduxStore) {
  const componentsWithFetch = renderProps.components
    // Weed out 'undefined' routes.
    .filter(component => !!component)
    // Only look at components with a static fetchData() method
    .filter(component => component.fetchData);

  if (!componentsWithFetch.length) {
    return;
  }

  // Call the fetchData() methods, which lets the component dispatch possibly
  // asynchronous actions, and collect the promises.
  const promises = componentsWithFetch
    .map(component => component.fetchData(
      reduxStore.getState,
      reduxStore.dispatch,
      renderProps
    ));

  // Wait until all promises have been resolved.
  Promise.awaitAll(promises);
}

function SSRSubscribe(context) {
  return function(name, ...params) {
    Mongo.Collection._isSSR = false;

    // This is needed to load data in fast-render
    const data = context.subscribe(name, ...params);

    Mongo.Collection._fakePublish(data);
    Mongo.Collection._isSSR = true;

    // Fire the onReady callback immediately.
    if (params.length) {
      var callbacks = {};
      var lastParam = params[params.length - 1];
      if (_.isFunction(lastParam)) {
        callbacks.onReady = params.pop();
      } else if (lastParam &&
          // XXX COMPAT WITH 1.0.3.1 onError used to exist, but now we use
          // onStop with an error callback instead.
        _.any([lastParam.onReady, lastParam.onError, lastParam.onStop],
          _.isFunction)) {
        callbacks = params.pop();
      }
      callbacks.onReady && callbacks.onReady();
    }

    return {
      stop() {}, // Nothing to stop on server-rendering
      ready() { return true; } // server gets the data straight away
    };
  }
}

function generateSSRData(serverOptions, context, req, res, renderProps, history) {

  let html, css, head;

  try  {

    FastRender.frContext.withValue(context, () => {
      const originalSubscribe = Meteor.subscribe;
      Meteor.subscribe = SSRSubscribe(context);

      Mongo.Collection._isSSR = true;
      Mongo.Collection._ssrData = {};

      if (serverOptions.preRender) {
        serverOptions.preRender(req, res);
      }

      renderProps = {
        ...renderProps,
        ...serverOptions.props
      };

      // If using redux, create the store.
      let reduxStore;
      if (typeof serverOptions.createReduxStore !== 'undefined') {
        // Create the store, with no initial state.
        reduxStore = serverOptions.createReduxStore(undefined, history);
        // Fetch components data.
        fetchComponentData(renderProps, reduxStore);
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
      // html = ReactDOMServer.renderToString(app);
      const renderedData = StyleSheetServer.renderStatic(function(){
        return ReactDOMServer.renderToString(app);
      });

      html = renderedData.html;
      css = renderedData.css;

      if (css) {
        InjectData.pushData(res, 'aphrodite-classes', JSON.stringify(css));
      }

      const head = ReactHelmet.rewind();

      // If using redux, pass the resulting redux state to the client so that it
      // can hydrate from there.
      if (reduxStore) {
        // inject-data accepts raw objects and calls JSON.stringify() on them,
        // but the _.each() done in there does not play nice if the store contains
        // ImmutableJS data. To avoid that, we serialize ourselves.
        InjectData.pushData(res, 'redux-initial-state', JSON.stringify(reduxStore.getState()));
      }

      if (serverOptions.postRender) {
        serverOptions.postRender(req, res);
      }

      Mongo.Collection._isSSR = false;

      Meteor.subscribe = originalSubscribe;

    });

    InjectData.pushData(res, 'fast-render-data', context.getData());

  } catch (err) {
    console.error('error while server-rendering', err.stack);
  }

  return { html, css, head };

}

function addInjectData(res, data) {

  let condition = res._injectPayload && !res._injected;

  if (condition) {
    // if cors headers included if may cause some security holes
    // so we simply turn off injecting if we detect an cors header
    // read more: http://goo.gl/eGwb4e
    if (res._headers['access-control-allow-origin']) {
      let warnMessage =
        'warn: injecting data turned off due to CORS headers. ' +
        'read more: http://goo.gl/eGwb4e';

      console.warn(warnMessage);
      return data;
    }

    // inject data
    let payload = InjectData._encode(res._injectPayload);
    data = data.replace('</body>', `<script type="text/inject-data">${payload}</script></body>`);

    res._injected = true;

    return data
  }

  return data

}

function addAssetsChunks(serverOptions, data) {
  const chunkNames = serverOptions.webpackStats.assetsByChunkName;
  const publicPath = serverOptions.webpackStats.publicPath;

  if (typeof chunkNames.common !== 'undefined') {
    var chunkSrc = (typeof chunkNames.common === 'string')?
      chunkNames.common :
      chunkNames.common[0];

    data = data.replace('</body>', '<script type="text/javascript" src="' + publicPath + chunkSrc + '"></script></body>');
  }

  for (var i = 0; i < global.__CHUNK_COLLECTOR__.length; ++i) {
    if (typeof chunkNames[global.__CHUNK_COLLECTOR__[i]] !== 'undefined') {
      var chunkSrc = (typeof chunkNames[global.__CHUNK_COLLECTOR__[i]] === 'string')?
        chunkNames[global.__CHUNK_COLLECTOR__[i]] :
        chunkNames[global.__CHUNK_COLLECTOR__[i]][0];

      data = data.replace('</body>', '<script type="text/javascript" src="' + publicPath + chunkSrc + '"></script></body>');
    }
  }

  return data;
}

function patchResWrite(clientOptions,
  serverOptions,
  originalWrite,
  css,
  html,
  head,
  req,
  res
) {

  const cacheKey = _getCacheKey(req.url);

  // if there is cached data and it's not expired
  if (cache[cacheKey]) {
    return function(data) {
      originalWrite.call(this, cache[cacheKey].data);
    }
  }

  return function(data) {
    if(typeof data === 'string' && data.indexOf('<!DOCTYPE html>') === 0) {

      if (!serverOptions.dontCompress) {
        data = addInjectData(res, data)
      }

      if (typeof serverOptions.webpackStats !== 'undefined') {
        data = addAssetsChunks(serverOptions, data);
      }

      if (!serverOptions.dontMoveStyles) {
        data = moveStyles(data);
      }

      if (!serverOptions.dontMoveScripts) {
        data = moveScripts(data);
      }

      if (css) {
        data = data.replace('</head>', '<style id="' + (clientOptions.styleCollectorId || 'css-style-collector-data') + '">' + css.content + '</style></head>');
      }

      if (head) {
        // Add react-helmet stuff in the header (yay SEO!)
        data = data.replace('<head>',
          '<head>' + head.title + head.base + head.meta + head.link + head.script
        );
      }

      data = data.replace('<body>', '<body><' + (clientOptions.rootElementType || 'div') + ' id="' + (clientOptions.rootElement || 'react-app') + '" >' + html + '</' + (clientOptions.rootElementType || 'div') + '>');

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


export default function sendSSRHtml(
  clientOptions = {},
  serverOptions = {},
  context,
  req,
  res,
  next,
  renderProps,
  history
) {

  const { css, html, head } = generateSSRData(
    serverOptions,
    context,
    req,
    res,
    renderProps,
    history
  );

  res.write = patchResWrite(
    clientOptions,
    serverOptions,
    res.write,
    css,
    html,
    head,
    req,
    res
  );

  next();
}

/*

  Utilities

*/
// Thank you FlowRouter for this wonderful idea :)
// https://github.com/kadirahq/flow-router/blob/ssr/server/route.js
function moveScripts(data) {
  const $ = Cheerio.load(data, {
    decodeEntities: false
  });
  const heads = $('head script').not('[data-ssr-ignore="true"]');


  $('body').append(heads);

  // Remove empty lines caused by removing scripts
  $('head').html($('head').html().replace(/(^[ \t]*\n)/gm, ''));

  return $.html();
}

function moveStyles(data) {

  const $ = Cheerio.load(data, {
    decodeEntities: false
  });

  const styles = $('head link[type="text/css"]').not('[data-ssr-ignore="true"]');
  $('head').append(styles);

  // Remove empty lines caused by removing scripts
  $('head').html($('head').html().replace(/(^[ \t]*\n)/gm, ''));

  return $.html();
}

function _getCacheKey(url) {
  return Meteor.userId() + "::" + url
}
