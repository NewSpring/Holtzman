/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  select,
  boolean,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.MiniCard.md";
import MiniCard from "../cards.MiniCard";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary", "dark-primary", "dark-secondary")))
  ;

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story
  .add("MiniCard", withReadme(Readme, () => {
    // set channel name options
    const channelOptions = {
      articles: "Articles",
      devotionals: "Devotionals",
      news: "News",
      sermons: "Sermons",
      stories: "Stories",
    };

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

    // Channel Name
    content.channelName = select("type", channelOptions, "articles");

    // Image
    const defaultImageURL = "https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg";
    content.content.images[0].url = text("image link", defaultImageURL);

    // Title
    const title = text("title", content.title);

    // Turn Off Image
    const hideImage = boolean("Hide Image?", false);
    if (hideImage) {
      content.content.images[0].url = "";
    }

    return (
      <div style={{ maxWidth: "480px" }}>
        <MiniCard
          title={title}
          content={content}
        />
      </div>);
  }));
