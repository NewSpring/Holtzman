import { Meteor } from "meteor/meteor";
import renderer from "react-test-renderer";
import PrimaryButton, { buttonClasses, ButtonText, Icon } from "../Primary";

const generateComponent = (additionalProps={}) => (
  <PrimaryButton { ...additionalProps } />
);

beforeEach(() => {
  Meteor.userId = jest.fn();
});

describe("PrimaryButton", () => {
  it("renders with minimum props", () => {
    const tree = renderer.create(generateComponent());
    expect(tree).toMatchSnapshot();
  });

  it("overrides classes with theme if theme", () => {
    const tree = renderer.create(generateComponent({
      theme: "my cool theme",
    }));
    expect(tree).toMatchSnapshot();
  });

  it("passes the onClick function", () => {
    const tree = renderer.create(generateComponent({
      onClick: () => {},
    }));
    expect(tree).toMatchSnapshot();
  });

  it("calls onClick when clicked", () => {

  });

  it("has enabled styles when enabled", () => {
    const tree = renderer.create(generateComponent({
      disabled: false,
    }));
    expect(tree).toMatchSnapshot();
  });

  it("has default styles when disabled but not logged in", () => {
    const tree = renderer.create(generateComponent({
      disabled: true,
    }));
    expect(tree).toMatchSnapshot();
  });

  it("has disabled style when disabled and logged in", () => {
    Meteor.userId = jest.fn(() => "test");
    const tree = renderer.create(generateComponent({
      disabled: true,
    }));
    expect(tree).toMatchSnapshot();
  });

  it("passes a value", () => {
    const tree = renderer.create(generateComponent({
      value: "test",
    }));
    expect(tree).toMatchSnapshot();
  });

  it("passes a style object", () => {
    const tree = renderer.create(generateComponent({
      style: {
        background: "red",
      },
    }));
    expect(tree).toMatchSnapshot();
  });
});

describe("buttonClasses", () => {
  it("has btn at least", () => {
    const result = buttonClasses(undefined, false, "");
    expect(result).toMatchSnapshot();
  });

  it("has has-card if saved payments", () => {
    const result = buttonClasses([{}], false, "");
    expect(result).toMatchSnapshot();
  });
  it("has btn--disabled if disabled and userId", () => {
    Meteor.userId = jest.fn(() => "test");
    const result = buttonClasses(undefined, true, "");
    expect(result).toMatchSnapshot();
  });
  it("has additionalClasses if passed", () => {
    const result = buttonClasses(undefined, false, "additional class names");
    expect(result).toMatchSnapshot();
  });
});

describe("ButtonText", () => {
  it("says `Sign In` if not userId", () => {
    const tree = renderer.create(
      <ButtonText />
    );
    expect(tree).toMatchSnapshot();
  });
  it("says `Give Now` if signed in and no override", () => {
    Meteor.userId = jest.fn(() => "test");
    const tree = renderer.create(
      <ButtonText />
    );
    expect(tree).toMatchSnapshot();
  });
  it("overrides if signed in and override", () => {
    Meteor.userId = jest.fn(() => "test");
    const tree = renderer.create(
      <ButtonText
        overrideText="Give Later"
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("says `Review Using 6789` if signed in and has saved account", () => {
    Meteor.userId = jest.fn(() => "test");
    const mockSavedPayments = [{}];
    const mockGetAccount = jest.fn(() => {
      return {
        payment: {
          accountNumber: "123456789",
        },
      }
    });
    const tree = renderer.create(
      <ButtonText
        savedPayments={mockSavedPayments}
        getAccount={mockGetAccount}
        hideCard={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("still says `Give Now` if hideCard is true", () => {
    Meteor.userId = jest.fn(() => "test");
    const mockSavedPayments = [{}];
    const mockGetAccount = jest.fn(() => {
      return {
        payment: {
          accountNumber: "123456789",
        },
      }
    });
    const tree = renderer.create(
      <ButtonText
        savedPayments={mockSavedPayments}
        getAccount={mockGetAccount}
        hideCard={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe("Icon", () => {
  it("does nothing if no saved payments", () => {
    const tree = renderer.create(
      <Icon />
    );
    expect(tree).toMatchSnapshot();
  });
  it("does nothing if saved payment and hideCard is true", () => {
    const tree = renderer.create(
      <Icon
        savedPayments={[{}]}
        hideCard={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("renders bank icon if paymentType ACH", () => {
    const mockGetAccount = jest.fn(() => {
      return {
        payment: {
          paymentType: "ACH",
        },
      };
    });
    const tree = renderer.create(
      <Icon
        savedPayments={[{}]}
        hideCard={false}
        getAccount={mockGetAccount}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("renders AmEx if AmEx", () => {
    const mockGetAccount = jest.fn(() => {
      return {
        payment: {
          paymentType: "AmEx",
        },
      };
    });
    const tree = renderer.create(
      <Icon
        savedPayments={[{}]}
        hideCard={false}
        getAccount={mockGetAccount}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
