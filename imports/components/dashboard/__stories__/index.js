/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  select,
  text,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import moment from "moment";
import Readme from "./index.md";
import Dashboard from "../";
import Activity from "../../cards/cards.Activity";

const story = storiesOf("Dashboard", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Dashboard", withReadme(Readme, () => {
    const title = text("Title", "Your Giving");
    const subNav = {
      item1: {
        linkUrl: "https://my.newspring.cc/give",
        onClick: () => {},
        title: "Home",
        isActive: true,
      },
      item2: {
        linkUrl: "https://my.newspring.cc/give/now",
        onClick: () => {},
        title: "Give Now",
        isActive: false,
      },
      item3: {
        linkUrl: "https://my.newspring.cc/give/history",
        onClick: () => {},
        title: "History",
        isActive: false,
      },
    };

    subNav.item1.title = text("Menu Item 1", subNav.item1.title);
    subNav.item2.title = text("Menu Item 2", subNav.item2.title);
    subNav.item3.title = text("Menu Item 3", subNav.item3.title);

    const activeOptions = {
      item1: "Menu Item 1",
      item2: "Menu Item 2",
      item3: "Menu Item 3",
    }
    const defaultActiveValue = "item1";
    const active = select("Active", activeOptions, defaultActiveValue);
    subNav.item1.isActive = active === "item1" ? true : false;
    subNav.item2.isActive = active === "item2" ? true : false;
    subNav.item3.isActive = active === "item3" ? true : false;

    return (
      <Dashboard
        title={title}
        subNav={subNav}
      >
        <Activity
          status="success"
          date="2016-12-25"
          message="Yay! This is so great for you!"
          linkText="You KNOW You Want To Click This"
          linkUrl="https://my.newspring.cc"
        />
      </Dashboard>
    );
  }));
