/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import moment from "moment";
import Readme from "./README.md";
import { Dashboard } from "../";
import Activity from "../../../../giving/cards/ActivityCard";

const story = storiesOf("Dashboard", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Dashboard",
  withReadme(Readme, () => {
    const title = text("Title", "Your Giving");

    const subNav = [
      {
        isActive: true,
        linkUrl: "https://my.newspring.cc/give",
        onClick: () => {},
        title: "Home",
      },
      {
        isActive: false,
        linkUrl: "https://my.newspring.cc/give/now",
        onClick: () => {},
        title: "Give Now",
      },
      {
        isActive: false,
        linkUrl: "https://my.newspring.cc/give/history",
        onClick: () => {},
        title: "History",
      },
    ];

    const activeOptions = {
      item1: "Menu Item 1",
      item2: "Menu Item 2",
      item3: "Menu Item 3",
    };
    const defaultActiveValue = "item1";
    const active = select("Active", activeOptions, defaultActiveValue);
    subNav[0].isActive = active === "item1" ? true : false;
    subNav[1].isActive = active === "item2" ? true : false;
    subNav[2].isActive = active === "item3" ? true : false;

    subNav[0].title = text("Menu Item 1", subNav[0].title);
    subNav[1].title = text("Menu Item 2", subNav[1].title);
    subNav[2].title = text("Menu Item 3", subNav[2].title);

    return (
      <Dashboard title={title} subNav={subNav}>
        <div className="soft-double">
          <Activity
            status="success"
            date="2016-12-25"
            message="Yay! This is so great for you!"
            linkText="You KNOW You Want To Click This"
            linkUrl="https://my.newspring.cc"
          />
        </div>
      </Dashboard>
    );
  }),
);
