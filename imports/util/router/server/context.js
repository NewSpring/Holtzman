// stolen from https://github.com/kadirahq/flow-router/blob/ssr/server/ssr_context.js
/* eslint-disable no-underscore-dangle */
export default class SsrContext {
  constructor() {
    this._collections = {};
  }

  getCollection(collName) {
    let collection = this._collections[collName];
    if (!collection) {
      const minimongo = Package.minimongo;
      // eslint-disable-next-line
      collection = this._collections[collName] = new minimongo.LocalCollection();
    }

    return collection;
  }

  addSubscription(name, params) {
    console.log("util/router/server/context addSubscription function");
    const fastRenderContext = FastRender.frContext.get();
    console.log("fastRenderContext = ", fastRenderContext);
    if (!fastRenderContext) {
      throw new Error(`Cannot add a subscription: ${name} without FastRender Context`);
    }

    const args = [name].concat(params);
    console.log("args = ", args);
    const data = fastRenderContext.subscribe(...args);
    console.log("data = ", data);
    this.addData(data);
  }

  addData(data) {
    _.each(data, (collDataCollection, collectionName) => {
      const collection = this.getCollection(collectionName);
      collDataCollection.forEach(collData => {
        collData.forEach(item => {
          const existingDoc = collection.findOne(item._id);
          if (existingDoc) {
            const newDoc = { ...existingDoc, ...item };
            delete newDoc._id;
            collection.update(item._id, newDoc);
          } else {
            collection.insert(item);
          }
        });
      });
    });
  }
}
