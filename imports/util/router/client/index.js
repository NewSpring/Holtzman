
// used to create the wrapper
import React from "react";
import ReactDOM from "react-dom";
import { applyRouterMiddleware, browserHistory, Router } from "react-router";
import useScroll from "react-router-scroll";
import InjectData from "./inject-data";

export default function run(routes, clientOptions = {}) {
  const history = browserHistory;

  const rootElementName = clientOptions.rootElement || "react-app";
  const rootElementType = clientOptions.rootElementType || "div";

  Meteor.startup(() => {
    let rootElement = document.getElementById(rootElementName);

    // In case the root element doesn't exist, let's create it
    if (!rootElement) {
      rootElement = document.createElement(rootElementType);
      rootElement.id = rootElementName;

      document.body.appendChild(rootElement);
    }

    // If using redux, create the store with the initial state injected by the server.
    let reduxStore;
    if (typeof clientOptions.createReduxStore !== "undefined") {
      InjectData.getData("redux-initial-state", data => {
        const initialState = data ? JSON.parse(data) : undefined;
        // XXX why does this not get mapped correctly in AC?
        if (initialState) initialState.apollo.queries = {};
        reduxStore = clientOptions.createReduxStore(initialState, history);
      });
    }

    /* eslint-disable react/no-children-prop */
    let app = (
      <Router
        history={history}
        children={routes}
        render={applyRouterMiddleware(useScroll())}
        {...clientOptions.props}
      />
    );
    /* eslint-enable react/no-children-prop */

    if (clientOptions.wrapper) {
      const wrapperProps = clientOptions.wrapperProps || {};
      // Pass the redux store to the wrapper, which is supposed to be some
      // flavour of react-redux's <Provider>.
      if (reduxStore) {
        wrapperProps.store = reduxStore;
      }

      app = <clientOptions.wrapper {...wrapperProps}>{app}</clientOptions.wrapper>;
    }

    // let css;
    // InjectData.getData("aphrodite-classes", (data) => {
    //   css = data ? JSON.parse(data) : {};
    // });

    // StyleSheet.rehydrate(css.renderedClassNames);

    ReactDOM.render(app, rootElement);

    const collectorEl = document.getElementById(
      clientOptions.styleCollectorId ||
      "css-style-collector-data"
    );
    if (collectorEl) collectorEl.parentNode.removeChild(collectorEl);
  });
}
