/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import { withKnobs, text } from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./cards.ScheduleOverview.md";
import ScheduleOverview from "../cards.ScheduleOverview.js";

const story = storiesOf("Cards", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Schedule Overview", withReadme(
    Readme,
    () => {
      const title = text("Title", "Step Up Fund");
      const summary = text("Summary", "In 2013 we began a new giving campaign as a part of our mission to reach 100,000 people. Step Up exists to put permanent facilities all over South Carolina and create campuses in more cities so that thousands of people will have a place to hear about Jesus!");
      const button = text("Button", "Learn More");
      const url = text("Image", "http://media2.fdncms.com/portmerc/imager/u/large/18265349/film-goldblumandrew.jpg");
      const images = [
        { fileLabel: "2:1", url },
        { fileLabel: "1:2", url },
        { fileLabel: "1:1", url },
      ];

      return (
        <div className={"floating"}>
          <div className={"grid__item text-left"} style={{ maxWidth: "960px" }}>
            <ScheduleOverview
              amount="$420.00"
              fund="Step Up Fund"
              frequency="Once a Month"
              started="Nov 1, 2015"
              latest="Sep 15, 2016"
              onEditClick={() => alert('42')}
            />
          </div>
        </div>
      );
    }
  ));
