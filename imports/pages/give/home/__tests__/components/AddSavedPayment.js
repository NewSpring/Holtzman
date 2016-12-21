
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour
} from "../../components/AddSavedPayment";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("should have a step one", () => {
  const component = shallow(<StepOne />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
it("should have a step two", () => {
  const component = shallow(<StepTwo />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
it("should have a step three", () => {
  const component = shallow(<StepThree />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
it("should have a step four", () => {
  const component = shallow(<StepFour />);
  expect(shallowToJson(component)).toMatchSnapshot();
});