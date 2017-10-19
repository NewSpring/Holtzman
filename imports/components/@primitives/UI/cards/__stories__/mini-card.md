## MiniCard

### Usage

```js
import MiniCard from "/imports/components/@primitives/UI/cards/MiniCard";

<MiniCard
  {...content}
/>

or

<MiniCard
  category="Articles"
  description="This is the description of the Jeff Goldblum article"
  icon="icon-category-text"
  image="http://www.adweek.com/files/blogs/jeff-goldblum-apartments-hed-2015.jpg"
  link="https://newspring.cc"
  title="MiniCard Title"
/>
```

### Properties

```{...content}```: an object containing the content of the card. We create this as one object and spread the necessary items, but you can pass them all individually if you want. The possible props are:

- **category**:string! - The text that shows next to the category icon in the bottom left of the card.
- **description**:string! - The text that shows under the title. We don't currently use it so it's not styled correctly and you wouldn't want to see it. When we start using it, we'll add it here.
- **icon**:string! - If present, will display an icon associated with the category. We use a function to get the icon string based off of the category name.
- **image**:string! - The URL to the image that you want to display in on the right side of the card. If not present, no image will display.
- **link**:string! - Allows you to set a link to a routed URL. This will not work here in Storybook because we don't have any routed links...but you get the idea.
- **title**:string! - The text of the title of the card.

```js
const content = {
  category: "Articles",
  //description: "This is the description of the Jeff Goldblum article."
  icon: "icon-category-text",
  image: "http://www.adweek.com/files/blogs/jeff-goldblum-apartments-hed-2015.jpg",
  // link: "https://newspring.cc",
  title: "MiniCard Title",
};
```

### Purpose

This is currently designed to be used to show related content on things like articles, devotionals, news, sermons, and stories.
