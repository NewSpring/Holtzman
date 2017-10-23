## FeedItem

### Usage

```js
import FeedItem from "/imports/components/content/feed-item-card";

<FeedItem
  item={item}
/>
```

### Properties

* **item** - an object that contains the information the card should display. For example:

```js
const item = {
  channelName: "articles",
  content: {
    colors: [
      { description: "primary", id: null, value: "303030" },
    ],
    images: [
      { fileLabel: "2:1", url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg" },
    ],
  },
  meta: {
    date: "10/31/2016",
  },
  title: "FeedItem Title",
};
```

### Purpose

This is currently designed to be used to show content cards from things like articles, devotionals, news, sermons, and stories.
