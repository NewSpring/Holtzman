/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select, color } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./feed-item-card.md";
import FeedItem from "../";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(
    backgrounds(
      defaultColors("light-primary", "light-secondary", "dark-primary", "dark-secondary"),
    ),
  );

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story.add(
  "FeedItem",
  withReadme(Readme, () => {
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
        colors: [{ description: "primary", id: null, value: "303030" }],
        images: [
          {
            fileLabel: "2:1",
            url: "http://i.huffpost.com/gen/1647376/images/o-JEFF-GOLDBLUM-facebook.jpg",
          },
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
    content.channelName = select("Type", channelOptions, "articles");

    // Date
    content.meta.date = text("Date", "10/31/2016");

    // Image
    const defaultImageURL = "http://i.huffpost.com/gen/1647376/images/o-JEFF-GOLDBLUM-facebook.jpg";
    content.content.images[0].url = text("image link", defaultImageURL);

    // Background Color For Series
    if (content.channelName === "series_newspring") {
      const label = "Background Color";
      const defaultValue = "#303030";
      content.content.colors[0].value = color(label, defaultValue).replace("#", "");
    }

    return (
      <div className={"floating"}>
        <div className={"grid__item"} style={{ maxWidth: "480px" }}>
          <FeedItem item={content} />
        </div>
      </div>
    );
  }),
);
