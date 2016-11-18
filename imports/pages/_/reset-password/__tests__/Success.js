import renderer from "react-test-renderer";
import Success from "../Success";

it("renders with message", () => {
  const result = renderer.create(
    <Success msg="test" />
  );
  expect(result).toMatchSnapshot();
});
