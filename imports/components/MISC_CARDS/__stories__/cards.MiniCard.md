## MiniCard component

### Usage

```js
import MiniCard from "../../components/cards/cards.MiniCard";

<MiniCard
  title={content.title}
  content={content}
/>
```

### Properties

* **title** - card title
* **content** - an object containing the content of the card. This can include an image and the type/category of the content shown in the card. For example:

```js
const content = {
  channelName: "articles",
  content: {
    images: [{
      fileLabel: "2:1",
      url: "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg",
    }],
  },
  title: "MiniCard Title",
};
```

### Purpose

This is currently designed to be used to show related content on things like articles, devotionals, news, sermons, and stories.
