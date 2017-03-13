import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import ResultLayout from "../ResultLayout";

const defaultProps = {
  groups: [],
  tags: ["test", "test"],
  loading: false,
  count: 12,
  query: "test",
  campuses: [],
  schedules: [1],
  showSearch: true,
  toggleSearch: true,
  showTags: true,
  toggleTags: true,
  onCardHover: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ResultLayout { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});