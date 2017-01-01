import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Template } from "../";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
