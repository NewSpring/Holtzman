import renderer from "react-test-renderer";
import { reset } from "aphrodite/lib/inject";
import { FundBreakdown, percentCalc } from "../FundBreakdown";

const mockData = {
  givingSummary: {
    accounts: {
      "Step Up": 100,
      "General Fund": 900,
    },
    data: [
      { month: "January", amount: 0, tick: "J" },
      { month: "February", amount: 0, tick: "F" },
      { month: "March", amount: 0, tick: "M" },
      { month: "April", amount: 0, tick: "A" },
      { month: "May", amount: 0, tick: "M" },
      { month: "June", amount: 0, tick: "J" },
      { month: "July", amount: 0, tick: "J" },
      { month: "August", amount: 0, tick: "A" },
      { month: "September", amount: 0, tick: "S" },
      { month: "October", amount: 0, tick: "O" },
      { month: "November", amount: 0, tick: "N" },
      { month: "December", amount: 0, tick: "D" },
    ],
  }
};

describe("FundBreakdown", () => {

  it("should return a percentage of the current total in relation to the total given across all accounts", () => {
    expect(percentCalc(mockedData, mockedData.givingSummary.accounts["Step Up"])).toBe("10");
  })

  it("should render properly with data.", () => {
    const tree = remderer.create(
      <FundBreakdown
        data={mockData}
      />
    );

    expect(tree).toMatchSnapshot();
  });
})
