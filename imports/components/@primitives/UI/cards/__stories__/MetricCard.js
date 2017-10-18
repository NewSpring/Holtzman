/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./metric-card.md";
import MetricCard from "../MetricCard";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds([{ name: "light-secondary", value: "#f7f7f7", default: true }]));

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story.add(
  "MetricCard",
  withReadme(Readme, () => {
    // set channel name options
    const cardData = {
      count: "11,130",
      label: "Total Salvations",
    };

    // Knobs
    cardData.count = text("Count", cardData.count);
    cardData.label = text("Label", cardData.label);

    return (
      <div className={"floating"}>
        <div className={"grid__item background--light-primary"} style={{ maxWidth: "480px" }}>
          <MetricCard count={cardData.count} label={cardData.label} />
        </div>
      </div>
    );
  }),
);
