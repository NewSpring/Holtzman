
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
