import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset } from "aphrodite/lib/inject";
import SavedPaymentCard from "../cards.SavedPayment";

const defaultAccount = {
  id: "1242",
  name: "Yule Brenner",
  payment: {
    accountNumber: "4111224499001256",
    paymentType: "Visa"
  }
};

const generateComponent = (additionalProps) =>
    <SavedPaymentCard {...additionalProps} />

describe("SavedPaymentCard", () => {

  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("should have a onClick function", () => {
    const mockOnClick = jest.fn();
    const tree = shallow(generateComponent({ payment: defaultAccount, onClick: mockOnClick}));

    tree.simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should have an accountName, fourDigit accountNumber, paymentType, and an onClick function", () => {
    const mockOnClick = jest.fn();
    const tree = shallow(generateComponent({ payment: defaultAccount, onClick: mockOnClick}));
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("should accept a classes prop", () => {
    const classes = "test1 test2";
    const tree = shallow(generateComponent({ payment: defaultAccount, classes: classes}));

    expect(tree.hasClass("test2")).toEqual(true);
  });
});
