import { shallow } from "enzyme";
import { Root } from "../";

jest.mock("../../../database/collections/likes", () => jest.fn());

const generateComponent = () => (
  <Root>
    <h1>test</h1>
  </Root>
);

it("renders with children", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
