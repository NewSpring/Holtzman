import renderer from "react-test-renderer";
import { reset } from "aphrodite/lib/inject";
import ScheduleOverview from "../ScheduleCard";

// jest.mock("moment", () => (date) => ({
//   format: (style) => `${date || "now"}.format(${style})`,
// }));

describe("ScheduleOverview", () => {
  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("has an amount, fund, frequency, started, latest, onEditClick and onDetailClick.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420.00"
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        latest="2017-02-02"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("correctly displays a negative value.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$-420.00"
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        latest="2017-02-02"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("doesn't have a latest transaction, if one isn't passed", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420.00"
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if currency symbol isn't present.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="420.00"
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if there isn't any cents.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420"
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if there isn't an amount.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount=""
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if a base heading size isn't set", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420.00"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="2017-02-01"
        onEditClick={jest.fn()}
        onDetailClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });
});
