
import { GivingSummary } from "../GivingSummary";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

//mocked because already tested
jest.mock("./../../../../components/cards/cards.YearToDate.js", () => () => <div /> );

const data = {
  accounts: {
    'General Fund': 66,
    'Christmas Offering': 0,
    'Step Up Fund': 0
  },
  total: 66,
  chartData: [
    { month: 'January', amount: 0, tick: 'J' },
    { month: 'February', amount: 11, tick: 'F' },
    { month: 'March', amount: 0, tick: 'M' },
    { month: 'April', amount: 9, tick: 'A' },
    { month: 'May', amount: 18, tick: 'M' },
    { month: 'June', amount: 7, tick: 'J' },
    { month: 'July', amount: 6, tick: 'J' },
    { month: 'August', amount: 5, tick: 'A' },
    { month: 'September', amount: 4, tick: 'S' },
    { month: 'October', amount: 3, tick: 'O' },
    { month: 'November', amount: 2, tick: 'N' },
    { month: 'December', amount: 1, tick: 'D' }
  ]
};

const generateComponent = (additionalProps) =>
  <GivingSummary breakpoints={[]} {...additionalProps} />

describe("GivingSummary", () => {
  it("should render with minimal props", () => {
    const component = mount(generateComponent());
    expect(mountToJson(component)).toMatchSnapshot();
  });
  it("should render nothing if the breakpoints don't match", () => {
    const component = mount(generateComponent({ breakpoints: ["lap-and-up"] }));
    expect(mountToJson(component)).toMatchSnapshot();
  });
  it("should pass correct props to graph with data", () => {
    const component = mount(generateComponent({data: data}));
    expect(mountToJson(component)).toMatchSnapshot();
  });
});
