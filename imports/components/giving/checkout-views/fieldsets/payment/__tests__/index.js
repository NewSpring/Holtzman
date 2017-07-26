import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Payment from "../";

const defaultProps = {
  save: jest.fn(),
  data: {
    payment: {
      expiration: null,
    },
  },
  savedAccount: {},
  header: <span>header</span>,
  children: <span>child</span>,
  toggles: ["one", "two"],
  transactionType: "default",
  schedule: { start: null },
  back: jest.fn(),
  next: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Payment {...newProps} />;
};

it("should render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("savePayment should change save state and call save", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(
    generateComponent({
      save: mockSave,
    })
  );

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
  const wrapper = shallow(
    generateComponent({
      save: mockSave,
    })
  );

  const result = wrapper.instance().saveName("");
  expect(result).toBeFalsy();
  expect(mockSave).toHaveBeenCalledTimes(0);
});

it("saveName should call save if value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(
    generateComponent({
      save: mockSave,
    })
  );

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

  const result = wrapper.instance().validate("12/30", mockTarget);
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

it("saveData calls save if valid", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(
    generateComponent({
      save: mockSave,
    })
  );
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountNumber";

  const result = wrapper.instance().saveData("test", mockTarget);
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    payment: {
      accountNumber: "test",
    },
  });
});

it("saveData does not call save if invalid", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(
    generateComponent({
      save: mockSave,
    })
  );
  const mockTarget = document.createElement("input");
  mockTarget.id = "accountNumber";

  const result = wrapper.instance().saveData("", mockTarget);
  expect(mockSave).toHaveBeenCalledTimes(0);
});

it("formatExp returns 5 characters if greater than 5", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().formatExp("12/123", mockTarget);
  expect(result.length).toBe(5);
  expect(result).toBe("12/12");
});

it("formatExp prepends `0` and appends `/` when only 2-9", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().formatExp("2", mockTarget);
  expect(result.length).toBe(3);
  expect(result).toBe("02/");
});

it("formatExp appends trailing slash when 2 numbers", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().formatExp("12", mockTarget);
  expect(result.length).toBe(3);
  expect(result).toBe("12/");
});

it("formatExp carries over month when second value is 3 or higher", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().formatExp("13", mockTarget);
  expect(result.length).toBe(4);
  expect(result).toBe("01/3");
});

it("formatExp leaves it alone if fine", () => {
  const wrapper = shallow(generateComponent());
  const mockTarget = document.createElement("input");
  mockTarget.id = "expiration";

  const result = wrapper.instance().formatExp("12/34", mockTarget);
  expect(result.length).toBe(5);
  expect(result).toBe("12/34");
});

it("toggle changes the payment type to ach if not ach", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(
    generateComponent({
      save: mockSave,
    })
  );
  wrapper.instance().toggle();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    payment: {
      type: "ach",
    },
  });
});

it("toggle changes the payment type to cc if ach", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(
    generateComponent({
      data: {
        payment: {
          type: "ach",
        },
      },
      save: mockSave,
    })
  );
  wrapper.instance().toggle();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    payment: {
      type: "cc",
    },
  });
});
