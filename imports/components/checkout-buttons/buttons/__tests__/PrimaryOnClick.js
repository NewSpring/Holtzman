import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";
import PrimaryButton from "../Primary";

const generateComponent = (additionalProps={}) => (
  <PrimaryButton { ...additionalProps } />
);

beforeEach(() => {
  Meteor.userId = jest.fn();
});

it("calls onClick when you click", () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(generateComponent({
    onClick: mockOnClick,
  }));

  expect(mockOnClick).not.toHaveBeenCalled();
  wrapper.find("button").simulate("click");
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
