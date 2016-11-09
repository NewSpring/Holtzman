import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import moment from "moment";
import Later from "../Later";

describe("Later", () => {
  it("should show the date that is passed in as a prop", () => {
    const dateToUse = moment("19740101");
    const tree = shallow(
      <Later date={dateToUse} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("should call onClick if it's clicked", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <Later onClick={mockOnClick} />
    );
    expect(mockOnClick).not.toHaveBeenCalled();
    wrapper.find("button").simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});