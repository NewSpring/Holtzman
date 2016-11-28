import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import moment from "moment";
import Activity from "../cards.Activity";

describe("Activity", () => {

  const generateComponent = (additionalProps = {}) => {
    const defaultProps = {
      status: "success",
      transaction: {
        id: "1234",
        date: moment("2016-12-25"),
        fund: {
          name: "General Fun",
        },
        amount: "$50",
        savedAccount: {
          name: "Credit Card",
        },
      },
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
