import renderer from "react-test-renderer";
import { Icon } from "../";

it("should render with card type", () => {
  const result = renderer.create(
    <Icon cardType="Visa" />
  );
  expect(result).toMatchSnapshot();
});
