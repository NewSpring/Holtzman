/* eslint-disable */
import renderer from "react-test-renderer";
import Offline from "../";

it("displays a message to the user", () => {
  const tree = renderer.create(<Offline />);
  expect(tree).toMatchSnapshot();
});

it("allows a custom link", () => {
  const tree = renderer.create(<Offline link={"hello@newspring.cc"} />);
  expect(tree).toMatchSnapshot();
});
