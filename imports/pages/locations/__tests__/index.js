import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Routes, {
  LayoutWithoutData,
  CAMPUSES_QUERY,
} from "../";

const generateComponent = () => (
  <LayoutWithoutData dispatch={jest.fn()} />
);

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("CAMPUS_QUERY is parsed correctly", () => {
  expect(CAMPUSES_QUERY).toMatchSnapshot();
});

it("Routes is parsed correctly", () => {
  expect(Routes).toMatchSnapshot();
});
