# staringatlights:inject-data

#### A way to inject data to the client with initial HTML. A continuation of `meteorhacks:inject-data`.

This is the package used by [`fast-render`](https://github.com/meteorhacks/fast-render) to push data to the client with the initial HTML.

## Installation

meteor add staringatlights:inject-data

## Push Data

We need to use this package with a server side router. We've extended nodejs `http.OutgoingMessage` and provides an API like this.

Here is an example with [picker](https://github.com/meteorhacks/picker).

```js
Picker.route("/", function(params, req, res, next) {
  var ejsonData = {aa: 10};
  InjectData.pushData(res, "some-key", ejsonData);
  // make sure to move the routing forward.
  next();
});
```

## Get Data

You can get data with the following API from the **client**.

```js
InjectData.getData("some-key", function(data) {
  console.log(data);
});
```
