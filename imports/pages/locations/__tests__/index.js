import { shallow } from "enzyme";
import Routes, {
  LayoutWithoutData,
  CAMPUSES_QUERY,
} from "../";

const generateComponent = () => (
  <LayoutWithoutData dispatch={jest.fn()} />
);

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("CAMPUS_QUERY is parsed correctly", () => {
  expect(CAMPUSES_QUERY).toMatchSnapshot();
});

it("Routes is parsed correctly", () => {
  expect(Routes).toMatchSnapshot();
});
