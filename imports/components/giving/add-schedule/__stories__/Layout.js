/* eslint-disable */
// import { storiesOf } from "@kadira/storybook";
// import {
//   withKnobs,
//   text,
//   boolean,
// } from "@kadira/storybook-addon-knobs";
// import withReadme from "storybook-readme/with-readme";
// import backgrounds from "@storybook/addon-backgrounds";
// import centered from "/.storybook/decorators/centered";
// import defaultColors from "/.storybook/defaults";

// import Readme from "./Layout.md";
// import Layout from "../Layout";

// const story = storiesOf("AddSchedule", module)
//   .addDecorator(withKnobs)
//   .addDecorator(centered)
//   .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
//   ;

// story
//   .add("Layout", withReadme(Readme, () => (
//     <Layout
//       accounts={[{value: "General Fund"}]}
//       existing={{
//         amount: 10,
//         details: [{
//           account: { name: "Step Up", id: 180}
//         }],
//         next: new Date("2025", "01", "01"),
//         schedule: {value: "Monthly"},
//       }}
//       onClick={() => { alert("clicked"); }}
//       ready={true}
//       state={{}}
//       text="Make Schedule Now!"
//       total={10}
//     />
//   )));
