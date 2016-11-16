/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import Provider from "/.storybook/mocks/Provider";

import Readme from "./index.md";
import Give from "../";
// import Err from "../Err";
// import Layout from "../Layout";
// import Loading from "../Loading";
// import Success from "../Success";
import { modal, give as giveActions } from "../../../store";

const story = storiesOf("Give", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

const defaultProps = {
  give: {
    savedAccount: {
      id: "1",
    }
  },
  dispatch: () => {},
  data: {
    campuses: [],
    countries: [],
    savedPayments: [],
    states: [],
  },
};

story
  .add("Give Sign Up", withReadme(Readme, () => {
    return (
      <Provider>
        <Give {...defaultProps} />
      </Provider>
    )
  }));
  // .add("Err", withReadme(Readme, () => {
  //   return (
  //     <Err />
  //   )
  // }))
  // .add("Layout", withReadme(Readme, () => {
  //   return (
  //     <Layout />
  //   )
  // }))
  // .add("Loading", withReadme(Readme, () => {
  //   return (
  //     <Loading />
  //   )
  // }))
  // .add("Success", withReadme(Readme, () => {
  //   return (
  //     <Success />
  //   )
  // }));
  // .add("With one account", withReadme(Readme, () => {
  //   const name = text("Fund", "General Fund");
  //   return (
  //     <Provider>
  //       <AddToCart accounts={[{ name, id: 1 }]} />
  //     </Provider>
  //   );
  // }))
  // .add("With two accounts", withReadme(Readme, () => {
  //   const accounts = [
  //     { name: text("Fund 1", "General Fund"), id: 1 },
  //     { name: text("Fund 2", "Building Fund"), id: 2 }
  //   ]
  //   return (
  //     <Provider>
  //       <AddToCart accounts={accounts} />
  //     </Provider>
  //   );
  // }));