
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { SavedPaymentsList } from "../SavedPayments";

jest.mock("../withRemoveSavedPayment", () => () => <div />);

const mockPayments = {
  savedPayments: [
    {
      name: "Harambe's Card",
      id: 1,
      payment: { accountNumber: "123456******1234", paymentType: "Visa" },
    },
    {
      name: "My Card",
      id: 2,
      payment: { accountNumber: "654321******0123", paymentType: "MasterCard" },
    }
  ],
};

const generateComponent = (additionalProps) =>
  <SavedPaymentsList payments={mockPayments} />;

describe ("Saved Payments List", () => {
  it("should render with minimal props", () => {
    const component = mount(<SavedPaymentsList />);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it ("should render properly with data", () => {
    const component = mount(generateComponent());
    expect(mountToJson(component)).toMatchSnapshot();
  });
});
