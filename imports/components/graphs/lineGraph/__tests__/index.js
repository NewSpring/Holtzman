import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import LineGraph from "../";

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    data: [
      {
        month: "January",
        amount: 10,
      },
      {
        month: "Febuary",
        amount: 20,
      },
      {
        month: "March",
        amount: 30,
      },
      {
        month: "April",
        amount: 40,
      },
      {
        month: "May",
        amount: 50,
      },
      {
        month: "June",
        amount: 60,
      },
      {
        month: "July",
        amount: 70,
      },
      {
        month: "August",
        amount: 80,
      },
      {
        month: "September",
        amount: 90,
      },
      {
        month: "October",
        amount: 100,
      },
      {
        month: "November",
        amount: 110,
      },
      {
        month: "December",
        amount: 120,
      },
    ],
    tickFormat: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    lineColor: "#6BAC43",
    lineWidth: "3",
    dotColor: "#6BAC43",
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
