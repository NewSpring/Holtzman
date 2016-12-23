import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

import { RightPanel, start, YEARS } from "../RightPanel";

jest.mock("../YTDMetrics", () => jest.fn(() => <div id="YTDMetrics" />));

const mockData = {
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

describe("RightPanel Layout", () => {

  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  const generateComponent = (additionalProps) =>
    <RightPanel
      {...additionalProps}
      data={mockData}
      changeYear={() => jest.fn()}
    />;

  it("should be the current year", () => {
    expect(start).toBe(new Date().getFullYear())
  });

  it("should provide an array of 10 years", () => {
    expect(YEARS.length).toBe(10);
  });

  it("should render a loading state", () => {
    const tree = mount(generateComponent({ loading: true }));
    expect(mountToJson(tree)).toMatchSnapshot();
  });

  it("should render with data", () => {
    const tree = mount(generateComponent({ loading: false }));
    expect(mountToJson(tree)).toMatchSnapshot();
  });
});