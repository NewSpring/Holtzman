import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import MetricCard from "../MetricCard";

describe("MetricCard", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it("renders with props", () => {
    const cardData = {
      count: "11,130",
      label: "Total Salvations",
    };

    const tree = renderer.create(
      <MetricCard
        count={cardData.count}
        label={cardData.label}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
