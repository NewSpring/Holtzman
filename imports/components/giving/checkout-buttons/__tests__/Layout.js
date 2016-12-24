import { Meteor } from "meteor/meteor";
import renderer from "react-test-renderer";

import { SecondaryLayout, TertiaryLayout, ChangePaymentsLayout } from "../Layout";

beforeEach(() => {
  Meteor.userId = jest.fn(() => { return false });
});

describe("SecondaryLayout", () => {
  it("renders if not authorized and not logged in", () => {
    const tree = renderer.create(
      <SecondaryLayout
        authorized={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("does not render if authorized and not logged in", () => {
    const tree = renderer.create(
      <SecondaryLayout
        authorized={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("does not render if not authorized and logged in", () => {
    Meteor.userId = jest.fn(() => { return true });
    const tree = renderer.create(
      <SecondaryLayout
        authorized={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("passes register as an onClick prop", () => {
    const tree = renderer.create(
      <SecondaryLayout
        authorized={false}
        register={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe("TertiaryLayout", () => {
  it("renders if not disabledGuest and not logged in", () => {
    const tree = renderer.create(
      <TertiaryLayout
        disabledGuest={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("passes giveAsGuest as onClick prop", () => {
    const tree = renderer.create(
      <TertiaryLayout
        disabledGuest={false}
        giveAsGuest={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("does not render if disabledGuest", () => {
    const tree = renderer.create(
      <TertiaryLayout
        disabledGuest={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("does not render if logged in", () => {
    Meteor.userId = jest.fn(() => { return true });
    const tree = renderer.create(
      <TertiaryLayout
        disabledGuest={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe("ChangePaymentsLayout", () => {
  it("does not render if no saved payments", () => {
    const tree = renderer.create(
      <ChangePaymentsLayout
        savedPayments={undefined}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("does not render if saved payments but hide card is true", () => {
    const tree = renderer.create(
      <ChangePaymentsLayout
        savedPayments={[{}]}
        hideCard={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("does not render if saved payments and not hide card but not logged in", () => {
    const tree = renderer.create(
      <ChangePaymentsLayout
        savedPayments={[{}]}
        hideCard={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders under the right conditions", () => {
    Meteor.userId = jest.fn(() => { return true });
    const tree = renderer.create(
      <ChangePaymentsLayout
        savedPayments={[{}]}
        hideCard={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("passes changePayments as onClick prop", () => {
    Meteor.userId = jest.fn(() => { return true });
    const tree = renderer.create(
      <ChangePaymentsLayout
        savedPayments={[{}]}
        hideCard={false}
        changePayments={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
