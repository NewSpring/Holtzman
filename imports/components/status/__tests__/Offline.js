import renderer from "react-test-renderer";
import Offline from "../Offline";

it("displays a message to the user", () => {
  const tree = renderer.create(<Offline />);
  expect(tree).toMatchSnapshot();
});
