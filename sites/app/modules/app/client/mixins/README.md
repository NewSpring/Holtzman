<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Mixins
=======================

Mixins are used to add common functionality to different React Components.

Mixins can be included like this:

```javascript
import ReactMixin from "react-mixin"
import { MixinName } from "app/client/mixins"
@ReactMixin.decorate(MixinName)
```

## Graphable

The `Graphable` mixin is used to load data from our GraphQL server, Heighliner. There are a couple parts to this mixin.

#### Loading Data

First, to load data, create a static attribute `graphQuery` on your component with an array of requests you would like to make:

```javascript
import ArticleQuery from "./queries/single"

@ReactMixin.decorate(Graphable)
export default class ArticlesSingle extends Component {

  static graphQuery = {
    requests: [
      { name: "article", query: ArticleQuery }
    ]
  }

}
```

This will attach the results of the query (an article) to `this.data` with the `name` you provide: `this.data.article`. You could supply the GQL query directly to the `query` attribute as a string, but they are often long. So, it's nice to keep them in their own `query.gql` file.

You can also pass multiple requests:

```javascript
static graphQuery = {
  requests: [
    { name: "article", query: ArticleQuery },
    { name: "series", query: SeriesQuery }
  ]
}
```

...which will map to `this.data.article` and `this.data.series` respectively.

#### Dynamic Queries

By default, the mixin will try to replace `{{entryId}}` in the GQL query with the value of `this.props.params.entryId`. But you can also replace whatever value you want by supplying a `replace` attribute:

```javascript
static graphQuery = {
  requests: [
    { name: "sermon", query: SermonQuery, replace: "sermonId" },
  ]
}
```

Now, the query will replace `{{sermonId}}` with `this.props.params.sermonId`:

```
{
  content(id: {{sermonId}}) {
  ...
}
```

#### Infinite Scroll

The Graphable mixin can also handle infinite scrolling pagination for you. Just defined which request should be paginated, and then state that the component is considered a feed to turn it on:

```javascript
static graphQuery = {
  requests: [
    { name: "articles", query: ArticlesQuery, paginate: true }
  ],
  feed: true
}
```

#### Data Load Callback

The mixin also has a callback, of sorts. When a request has completed, the mixin will try to call `graphDataDidLoad` on the component with the request name as the only parameter:

```javascript
graphDataDidLoad(request) {
  if (request === "article") {
    this.shareableAction(this.data.article);
  }
}
```

This allows you to update state and such without doing so inside the `render` function and causing warnings/errors.


## Likeable

The `Likeable` mixin is used to add liking functionality to all our different content types.

It requires that you are on the "CONTENT" nav, and that you set the action after this. Because of this, these actions should be dispatched from the class including the mixin and not from the mixin itself.

```javascript
componentWillMount() {
  this.props.dispatch(navActions.setLevel("CONTENT"));
  this.props.dispatch(navActions.setAction({
    id: 3,
    action: this.likeableAction
  }));
}
```

Currently supports: devotion, article, story, series, sermon, and album.

A subscription to the `likes` collection will probably also be useful, but is handled by core.

## Shareable

The `Shareable` mixin is used to add sharing data when using the share nav button. Simply supply the content item to `this.shareableAction` and the mixin will take care of the rest.

```javascript
graphDataDidLoad(request) {
  if (request === "article") {
    this.shareableAction(this.data.article);
  }
}
```

For items like sermons, supply the parent item (series) using the `parentItem` option:

```javascript
graphDataDidLoad(request) {
  if (this.data.sermon && this.data.series) {
    this.shareableAction(this.data.sermon, { parentItem: this.data.series });
  }
}
```

This will use the series to fetch an image and the generate the url to share.

