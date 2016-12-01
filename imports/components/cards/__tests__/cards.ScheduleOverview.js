import renderer from "react-test-renderer";
import { reset } from "aphrodite/lib/inject";
import ScheduleOverview,
  { getCurrencySymbol,
    getNegative,
    getDollars,
    getCents
  } from "../cards.ScheduleOverview";

describe("ScheduleOverview", () => {
  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("returns a '$' currency symbol", () => {
    expect(getCurrencySymbol("$420.00")).toBeDefined();
  });

  it("returns a '$' currency symbol when none is provided", () => {
    expect(getCurrencySymbol("420.00")).toBe("$");
  });

  it("returns a negative when one is provided", () => {
    expect(getNegative("$-420.00")).toBeDefined();
  });

  it("doesn't return a negative when one isn't provided", () => {
    expect(getNegative("$420.00")).toBeNull();
  });

  it("returns '420' dollars", () => {
    expect(getDollars("$420.00")).toBe("420");
  });

  it("returns '0' dollars when none is provided", () => {
    expect(getDollars("")).toBe("0");
  });

  it("returns '12' cents", () => {
    expect(getCents("$420.12")).toBe("12");
  });

  it("returns '00' cents when none is provided", () => {
    expect(getCents("420")).toBe("00");
  });

  it("has an amount, fund, frequency, started, latest and onEditClick.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420.00"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Jun 15, 2015"
        latest="Nov 15, 2016"
        onEditClick={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("correctly displays a negative value.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$-420.00"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Jun 15, 2015"
        latest="Nov 15, 2016"
        onEditClick={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("doesn't have a latest transaction, if one isn't passed", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420.00"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Jun 15, 2015"
        onEditClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if currency symbol isn't present.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="420.00"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Jun 15, 2015"
        onEditClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if there isn't any cents.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount="$420"
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Jun 15, 2015"
        onEditClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });

  it("falls back correctly if there isn't an amount.", () => {
    const tree = renderer.create(
      <ScheduleOverview
        amount=""
        fund="Step Up Fund"
        frequency="Once A Month"
        started="Jun 15, 2015"
        onEditClick={jest.fn()}
      />
    )

    expect(tree).toMatchSnapshot();
  });
});
