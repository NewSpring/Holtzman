import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import YearToDate from "../cards.YearToDate";

describe("Year To Date", () => {

  const generateComponent = (additionalProps = {}) => {
    const defaultProps = {
      graphData: {
        data: [
          {
            month: "January",
            amount: 300,
            tick: "J",
          },
          {
            month: "February",
            amount: 275,
            tick: "F",
          },
          {
            month: "March",
            amount: 300,
            tick: "M",
          },
          {
            month: "April",
            amount: 325,
            tick: "A",
          },
          {
            month: "May",
            amount: 300,
            tick: "M",
          },
          {
            month: "June",
            amount: 275,
            tick: "J",
          },
          {
            month: "July",
            amount: 300,
            tick: "J",
          },
          {
            month: "August",
            amount: 325,
            tick: "A",
          },
          {
            month: "September",
            amount: 300,
            tick: "S",
          },
          {
            month: "October",
            amount: 275,
            tick: "O",
          },
          {
            month: "November",
            amount: 300,
            tick: "N",
          },
          {
            month: "December",
            amount: 350,
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
            fontSize: "20",
            padding: "8",
            fill: "#858585",
          },
        },
      },
      amount: "2017",
      linkUrl: "https://my.newspring.cc",
    };

    return (
      <YearToDate {...defaultProps} {...additionalProps} />
    );
  };

  it("should render with the default set of props", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
