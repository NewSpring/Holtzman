/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

import Provider from "/.storybook/mocks/Provider";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "../README.md";
import AddToCart from "../";

const story = storiesOf("Add To Cart", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("With one account", withReadme(Readme, () => {
    const name = text("Fund", "General Fund");
    return (
      <Provider>
        <AddToCart accounts={[{ name, id: 1 }]} />
      </Provider>
    );
  }))
  .add("With two accounts", withReadme(Readme, () => {
    const accounts = [
      { name: text("Fund 1", "General Fund"), id: 1 },
      { name: text("Fund 2", "Building Fund"), id: 2 }
    ]
    Meteor.userId = () => true;
    return (
      <Provider>
        <AddToCart accounts={accounts} />
      </Provider>
    );
  }));
