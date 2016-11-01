/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  select,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.FeedItem.md";
import FeedItem from "../cards.FeedItem";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary", "dark-primary", "dark-secondary")))
  ;

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story
  .add("FeedItem", withReadme(Readme, () => {
    // set channel name options
    const channelOptions = {
      articles: "Articles",
      devotionals: "Devotionals",
      news: "News",
      series_newspring: "Series",
      stories: "Stories",
    };

    const content = {
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

    // Title
    content.title = text("Title", "FeedItem Title");

    // Channel Name
    content.channelName = select("type", channelOptions, "articles");

    // Date
    content.meta.date = text("Date", "10/31/2016");

    // Image
    const defaultImageURL = "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg";
    content.content.images[0].url = text("image link", defaultImageURL);

    return (
      <div style={{ maxWidth: "480px" }}>
        <FeedItem
          item={content}
        />
      </div>);
  }));
