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
import { MixinName } from "../mixins"
@ReactMixin.decorate(MixinName)
```

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
