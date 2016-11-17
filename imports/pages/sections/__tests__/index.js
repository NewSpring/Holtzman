import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Template } from "../";

jest.mock("../../../mixins/mixins.Header", () => {});

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
