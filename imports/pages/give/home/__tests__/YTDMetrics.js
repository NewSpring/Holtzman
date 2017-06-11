/* eslint-disable */
import renderer from "react-test-renderer";
import { reset } from "aphrodite/lib/inject";

import { YTDMetrics } from "../YTDMetrics";

const graphData = {
  loading: false,
  chartData: [
      { month: "January", amount: 1010, tick: "J" },
      { month: "February", amount: 332, tick: "F" },
      { month: "March", amount: 432, tick: "M" },
      { month: "April", amount: 832, tick: "A" },
      { month: "May", amount: 2120, tick: "M" },
      { month: "June", amount: 120, tick: "J" },
      { month: "July", amount: 1230, tick: "J" },
      { month: "August", amount: 110, tick: "A" },
      { month: "September", amount: 746, tick: "S" },
      { month: "October", amount: 574, tick: "O" },
      { month: "November", amount: 343, tick: "N" },
      { month: "December", amount: 233, tick: "D" },
    ],
  total: 3422
};

jest.mock("../../../../components/@primitives/UI/graphs/LineGraph", () => ({
  default: (props) => <pre> { JSON.stringify(props, null, 2) } </pre>
}));

describe("YTDMetrics", () => {
  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("returns a linegraph of data", () => {
    const tree = renderer.create(
      <YTDMetrics
        data={graphData}
        linkUrl={"/give/history"}
      />
    );

    expect(tree).toMatchSnapshot();
  });
})
