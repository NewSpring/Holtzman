import { shallow } from "enzyme";
import { Template } from "../";

jest.mock("../../../mixins/mixins.Header", () => {});

const generateComponent = () => (
  <Template />
);

it("renders", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
