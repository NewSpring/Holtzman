import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Groups from "../Groups";

const defaultProps = {
  items: [{}, {}],
  hide: jest.fn(),
};

const generateComponent = (additionalProps = {}) => (
  <Groups { ...defaultProps } />
);

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
