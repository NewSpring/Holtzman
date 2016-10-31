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

import Readme from "./cards.MiniCard.md";
import MiniCard from "../cards.MiniCard";

const story = storiesOf("Components", module)
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

    // setup the channel name to get info from the "Type" knob. Default is Articles.
    const channelName = select("type", channelOptions, "articles");

    const content = {
      channelName,
      content: {
        images: [],
      },
      title: "MiniCard Title",
    };

    const imageObject = {
      fileLabel: "2:1",
      url: "http://www.thefashionisto.com/wp-content/uploads/2016/07/Jeff-Goldblum-2016-Photo-Shoot-El-Pais-Icon-004.jpg",
    };
    content.content.images.push(imageObject);

    const defaultImageURL = "http://www.thefashionisto.com/wp-content/uploads/2016/07/Jeff-Goldblum-2016-Photo-Shoot-El-Pais-Icon-004.jpg";
    content.content.images[0].url = text("image link", defaultImageURL);

    return (
      <MiniCard
        title={text("title", content.title)}
        content={content}
      />);
  }));
