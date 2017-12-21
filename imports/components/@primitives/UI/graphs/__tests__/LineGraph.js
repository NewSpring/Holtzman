import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import LineGraph from "../LineGraph";

jest.mock("victory");

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    data: [
      {
        month: "January",
        amount: 10,
        tick: "J",
      },
      {
        month: "February",
        amount: 20,
        tick: "F",
      },
      {
        month: "March",
        amount: 30,
        tick: "M",
      },
      {
        month: "April",
        amount: 40,
        tick: "A",
      },
      {
        month: "May",
        amount: 50,
        tick: "M",
      },
      {
        month: "June",
        amount: 60,
        tick: "J",
      },
      {
        month: "July",
        amount: 70,
        tick: "J",
      },
      {
        month: "August",
        amount: 80,
        tick: "A",
      },
      {
        month: "September",
        amount: 90,
        tick: "S",
      },
      {
        month: "October",
        amount: 100,
        tick: "O",
      },
      {
        month: "November",
        amount: 110,
        tick: "N",
      },
      {
        month: "December",
        amount: 120,
        tick: "D",
      },
    ],
    lineColor: "#6BAC43",
    lineWidth: "3",
    dotColor: "#6BAC43",
    dotSize: "5",
    axisStyles: {
      axis: {
        lineColor: "transparent",
        lineWidth: "0",
      },
      tickLabels: {
        fontSize: "10",
        padding: "5",
        fill: "#858585",
      },
    },
  };

  return (
    <LineGraph {...defaultProps} {...additionalProps} />
  );
};

describe("Line Graph", () => {
  it("renders correctly with default props", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
