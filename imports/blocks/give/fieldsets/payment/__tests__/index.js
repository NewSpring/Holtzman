import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Payment from "../";

const defaultProps = {
  save: jest.fn(),
  data: {},
  savedAccount: {},
  header: <span>header</span>,
  children: <span>child</span>,
  toggles: ["one", "two"],
  transactionType: "default",
  schedules: {},
  back: jest.fn(),
  next: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Payment { ...newProps } />;
};

it("should render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("savePayment should change save state and call save", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  expect(wrapper.state().save).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(0);

  wrapper.instance().savePayment();
  expect(wrapper.state().save).toBeFalsy();
  expect(mockSave).toHaveBeenCalledTimes(0);

  wrapper.instance().savePayment();
  expect(wrapper.state().save).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
});

it("saveName should not call save if no value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  const result = wrapper.instance().saveName("");
  expect(result).toBeFalsy();
  expect(mockSave).toHaveBeenCalledTimes(0);
});

it("saveName should call save if value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  const result = wrapper.instance().saveName("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
});

it("validate always returns true if cardNumber and no value", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "cardNumber";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeTruthy();
});

it("validate always returns true if routingNumber and no value", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "routingNumber";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeTruthy();
});

it("validate accountNumber returns true if not empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountNumber";

  const result = wrapper.instance().validate("test", mockTarget);
  expect(result).toBeTruthy();
});

it("validate accountNumber returns false if empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountNumber";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeFalsy();
});

it("validate routingNumber returns true if not empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "routingNumber";

  const result = wrapper.instance().validate("test", mockTarget);
  expect(result).toBeTruthy();
});

it("validate accountType returns true if not empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountType";

  const result = wrapper.instance().validate("test", mockTarget);
  expect(result).toBeTruthy();
});

it("validate accountType returns false if empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountType";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeFalsy();
});

it("validate accountName returns true if not empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountName";

  const result = wrapper.instance().validate("test", mockTarget);
  expect(result).toBeTruthy();
});

it("validate accountName returns false if empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountName";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeFalsy();
});

it("validate cardNumber returns true if valid card", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "cardNumber";

  const result = wrapper.instance().validate("4111-1111-1111-1111", mockTarget);
  expect(result).toBeTruthy();
});

it("validate expiration returns true if not empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().validate("test", mockTarget);
  expect(result).toBeTruthy();
});

it("validate expiration returns false if empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeFalsy();
});

it("validate ccv returns true if valid", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "ccv";

  const result = wrapper.instance().validate("111", mockTarget);
  expect(result).toBeTruthy();
});

it("validate ccv returns false if empty", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "ccv";

  const result = wrapper.instance().validate("", mockTarget);
  expect(result).toBeFalsy();
});
