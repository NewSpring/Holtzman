
// used to create the wrapper
import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import InjectData from "./inject-data";
import { StyleSheet } from "aphrodite";

export function run(routes, clientOptions = {}){

  const history = clientOptions.history || browserHistory;

  const rootElementName = clientOptions.rootElement || 'react-app';
  const rootElementType = clientOptions.rootElementType || 'div';

  Meteor.startup(() => {

    if (typeof FastRender !== "undefined") {
      InjectData.getData('fast-render-data', function(payload) {
        FastRender.init(payload);
      });
    }

    let rootElement = document.getElementById(rootElementName);

    // In case the root element doesn't exist, let's create it
    if (!rootElement) {
      rootElement = document.createElement(rootElementType);
      rootElement.id = rootElementName;

      document.body.appendChild(rootElement);
    }

    // If using redux, create the store with the initial state injected by the server.
    let reduxStore;
    if (typeof clientOptions.createReduxStore !== 'undefined') {
      InjectData.getData('redux-initial-state', data => {
        const initialState = data ? JSON.parse(data) : undefined;
        reduxStore = clientOptions.createReduxStore(initialState, history);
      });
    }

    let app = (
      <Router
        history={history}
        children={routes}
        {...clientOptions.props}
      />
    );

    if (clientOptions.wrapper) {
      const wrapperProps = clientOptions.wrapperProps || {};
      // Pass the redux store to the wrapper, which is supposed to be some
      // flavour of react-redux's <Provider>.
      if (reduxStore) {
        wrapperProps.store = reduxStore;
      }

      app = <clientOptions.wrapper {...wrapperProps}>{app}</clientOptions.wrapper>;
    }

    let css;
    InjectData.getData('aphrodite-classes', data => {
      css = data ? JSON.parse(data) : {};
    });

    // StyleSheet.rehydrate(css.renderedClassNames);

    ReactDOM.render(app, rootElement);

    let collectorEl = document.getElementById(clientOptions.styleCollectorId || 'css-style-collector-data')
    if (collectorEl) collectorEl.parentNode.removeChild(collectorEl);
  });
};
