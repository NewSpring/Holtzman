import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { PageWithoutData as Page } from "../";

const defaultProps = {
  dispatch: jest.fn(),
};

const generateComponent = () => (
  <Page { ...defaultProps } />
);

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
