import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset } from "aphrodite/lib/inject";
import SavedPaymentCard from "../cards.SavedPayment";

const generateComponent = (onClick) => {
  const paymentAccount = {
    id: "1242",
    name: "Yule Brenner",
    payment: {
      accountNumber: "4111224499001256",
      paymentType: "Visa"
    }
  };

  return (
    <SavedPaymentCard
      payment={paymentAccount}
      onClick={onClick}
    />
  );
}

describe("SavedPaymentCard", () => {

  beforeEach(() => {
    reset();
  });

  afterEach(() => {
    reset();
  });

  it("should have a onClick function", () => {
    const mockOnClick = jest.fn();
    const tree = shallow(generateComponent(mockOnClick));

    tree.simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should have an accountName, fourDigit accountNumber, paymentType, and an onClick function", () => {
    const mockOnClick = jest.fn();
    const tree = shallow(generateComponent(mockOnClick));
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
