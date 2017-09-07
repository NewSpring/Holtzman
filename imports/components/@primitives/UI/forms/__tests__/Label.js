/* eslint-disable */

import renderer from "react-test-renderer";
import Label from "../Label";

it("displays a form label to the user", () => {
  const tree = renderer.create(<Label />);
  expect(tree).toMatchSnapshot();
});

it("spreads styles if disabled is true", () => {
  const tree = renderer.create(
    <Label disabled labelStyles={{ color: "green" }} />,
  );
  expect(tree).toMatchSnapshot();
});

it("passes the label for to the component", () => {
  const tree = renderer.create(<Label labelFor="goGoGadget" />);
  expect(tree).toMatchSnapshot();
});

it("displays a label name to the user", () => {
  const tree = renderer.create(<Label labelName="label" />);
  expect(tree).toMatchSnapshot();
});

it("disables the label", () => {
  const tree = renderer.create(<Label disabled />);
  expect(tree).toMatchSnapshot();
});
