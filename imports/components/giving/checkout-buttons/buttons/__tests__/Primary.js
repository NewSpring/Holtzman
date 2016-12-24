import { Meteor } from "meteor/meteor";
import renderer from "react-test-renderer";
import PrimaryButton, { buttonClasses } from "../Primary";

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
    const tree = renderer.create(generateComponent());
    expect(tree).toMatchSnapshot();
  });
  it("says `Give Now` if signed in and no override", () => {
    Meteor.userId = jest.fn(() => "test");
    const tree = renderer.create(generateComponent());
    expect(tree).toMatchSnapshot();
  });
  it("overrides if signed in and override", () => {
    Meteor.userId = jest.fn(() => "test");
    const tree = renderer.create(generateComponent({ text: "Give Later" }));
    expect(tree).toMatchSnapshot();
  });
  it("says `Review Your Gift` if signed in", () => {
    Meteor.userId = jest.fn(() => "test");
    const tree = renderer.create(generateComponent());
    expect(tree).toMatchSnapshot();
  });
});
