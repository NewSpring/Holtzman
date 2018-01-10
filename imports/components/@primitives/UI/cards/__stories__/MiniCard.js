/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./mini-card.md";
import MiniCard from "../MiniCard";
import categories from "../../../../../util/categories";

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
  "MiniCard",
  withReadme(Readme, () => {
    // set channel name options
    const channelOptions = {
      Articles: "Articles",
      Devotionals: "Devotionals",
      News: "News",
      Sermons: "Sermons",
      Stories: "Stories",
    };

    const content = {
      category: "Articles",
      // description: "This is a description of the article with Jeff Goldblum",
      icon: "icon-category-text",
      image: "http://www.adweek.com/files/blogs/jeff-goldblum-apartments-hed-2015.jpg",
      // link: "https://newspring.cc",
      title: "MiniCard Title",
    };

    // Category
    content.category = select("Type", channelOptions, "Articles");
    content.channelName = content.category.toLowerCase();
    content.icon = categories.icon(content);

    // Image
    const defaultImageURL =
      "http://www.adweek.com/files/blogs/jeff-goldblum-apartments-hed-2015.jpg";
    content.image = text("Image Link", defaultImageURL);

    // Title
    content.title = text("Title", content.title);

    // Turn Off Image
    const hideImage = boolean("Hide Image?", false);
    if (hideImage) {
      content.image = "";
    }

    return (
      <div className={"floating"}>
        <div className={"grid__item text-left"} style={{ maxWidth: "480px" }}>
          <MiniCard {...content} />
        </div>
      </div>
    );
  }),
);
