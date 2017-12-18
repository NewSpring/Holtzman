# Change Log

### v2.0.0
2016-Feb-19

* Override individual res objects instead of overriding the prototype. This is a fix to support Meteor 1.3, which gave us the gzipped version of the html.
* Because of that we had to change the API a bit on the server. See:
 - `res.pushData('key', {data: 'here'})` => `InjectData.pushData(res, 'key', {data: 'here'})`
 - `res.getData('key')` => `InjectData.getData(res, 'key')`

### v1.4.1
* Use `EJSON.parse()`. See: [#4](https://github.com/meteorhacks/inject-data/pull/4)

### v1.4.0

* Add support for SSR by prepending the html on top of the first script tag

### v1.3.0

* Add IE8 Compatibility
