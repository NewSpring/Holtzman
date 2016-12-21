import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import EditSavedPayment from "../"

const generateComponent = () => (
  <EditSavedPayment.EditSavedPayment />
);

describe("Index", () => {
  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("has routes", () => {
    expect(EditSavedPayment.Routes).toMatchSnapshot();
  });
})