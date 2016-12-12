import renderer from "react-test-renderer";
import { reset } from "aphrodite/lib/inject";
import ScheduleOverview, {
  getCurrencySymbol,
  getNegative,
  getDollars,
  getCents
} from "../cards.ScheduleOverview";

  jest.mock("moment", () => (date) => ({
  format: (style) => `${date || "now"}.format(${style})`,
}));

describe("ScheduleOverview", () => {
  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("has an amount, fund, frequency, started, latest and onEditClick.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420.00"
        baseHeadingSize="2"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Tue Mar 15 2016 20:00:00 GMT-0400 (EDT)"
        latest="Tue Mar 16 2016 20:00:00 GMT-0400 (EDT)"
        onEditClick={jest.fn()}
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
        started="Tue Mar 15 2016 20:00:00 GMT-0400 (EDT)"
        latest="Tue Mar 16 2016 20:00:00 GMT-0400 (EDT)"
        onEditClick={jest.fn()}
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
        started="Tue Mar 15 2016 20:00:00 GMT-0400 (EDT)"
        onEditClick={jest.fn()}
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
        started="Tue Mar 15 2016 20:00:00 GMT-0400 (EDT)"
        onEditClick={jest.fn()}
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
        started="Tue Mar 15 2016 20:00:00 GMT-0400 (EDT)"
        onEditClick={jest.fn()}
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
        started="Jun 15, 2015"
        onEditClick={jest.fn()}
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
        started="Tue Mar 15 2016 20:00:00 GMT-0400 (EDT)"
        onEditClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });
});
