/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { storiesOf } from "@kadira/storybook";
import { withKnobs, text } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./README.md";
import SideBySide from "./SideBySide";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Side by side", withReadme(
    Readme,
    () => {
      const title = text('Title', 'Step Up Fund');
      const summary = text('Summary', 'In 2013 we began a new giving campaign as a part of our mission to reach 100,000 people. Step Up exists to put permanent facilities all over South Carolina and create campuses in more cities so that thousands of people will have a place to hear about Jesus!');
      const button = text('Button', 'Learn More');
      const url = text('Image', "https://aff5fa4925746bf9c161-fb36f18ca122a30f6899af8eef8fa39b.ssl.cf5.rackcdn.com/images/Profile_Mario.aead314d435d8e52d9a4e92a6f799c4eee08081e.jpg");
      const images = [
        { fileLabel: "2:1", url },
        { fileLabel: "1:2", url },
        { fileLabel: "1:1", url },
      ];

      return (
        <SideBySide
          images={images}
        >
          <h3>{title}</h3>
          <p>{summary}</p>
          <div className="btn--dark-tertiary btn--small">{button}</div>
        </SideBySide>
      )
    }
  ));
