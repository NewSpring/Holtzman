import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import moment from "moment";
import Activity from "../cards.Activity";

describe("Activity", () => {

  const generateComponent = (additionalProps = {}) => {
    const defaultProps = {
      status: "success",
      date: moment("2016-12-25"),
      amount: "$50",
      fundName: "General Fun",
      savedAccount: "Credit Card",
      onClick: () => {},
    };

    return (
      <Activity {...defaultProps} {...additionalProps} />
    );
  };

  it("should render with the default set of props", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it("should render the warning status component", () => {
    const component = shallow(generateComponent({ status: "warning" }));
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it("should render the failed status component", () => {
    const component = shallow(generateComponent({ status: "failed" }));
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
