/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  boolean,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./index.md";
import CartContainer from "../index";

const story = storiesOf("CartContainer", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("CartContainer", withReadme(Readme, () => (
    <CartContainer
      accounts={[{ id: 180, name: "Step Up" }]}
      alive={true}
      addTransactions={() => { alert("added transaction"); }}
      clearAllSchedulesExcept={() => {}}
      clearSchedules={() => {}}
      clearTransactions={() => {}}
      onClick={() => { alert("clicked"); }}
      removeSchedule={() => { alert("removed schedule"); }}
      saveSchedule={() => { alert("saved schedule"); }}
      setTransactionType={() => { alert("set type"); }}
      text={"Give Now!"}
    />
  )));