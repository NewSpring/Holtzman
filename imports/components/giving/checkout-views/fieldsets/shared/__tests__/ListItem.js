import renderer from "react-test-renderer";
import { ListItem } from "../";

it("should render with props", () => {
  const mockTransaction = {
    label: "label",
    value: 24.00,
  };
  const result = renderer.create(
    <ListItem transaction={mockTransaction} />
  );
  expect(result).toMatchSnapshot();
});
