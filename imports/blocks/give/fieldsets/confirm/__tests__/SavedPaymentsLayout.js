
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

import SavedPaymentLayout from "../SavedPaymentLayout";

jest.mock("../../shared/Icon", () => jest.fn(() => <div />));

const mockData = {
  billing: {
    streetAddress: "Harambe's old place",
    city: "Cincinnati",
    state: "OH",
    zip: "12345"
  },
  payment: {
    card: {
      cardNumber: "5575-1234-1234-1234",
      expiration: "01/19",
      ccv: "123",
      name: "Harambe's Card",
    },
    account: {
      accountNumber: "1010101010",
      routingNumber: "123456789",
      name: "Harambe's Account",
    }
  },
};

const generateComponent = (additionalProps) =>
  <SavedPaymentLayout {...additionalProps}/>

it("should render with minimal props", () => {
  const component = mount(generateComponent());
  expect(mountToJson(component)).toMatchSnapshot();
});

it("should accept billing and payment props", () => {
  const component = mount(generateComponent({ billing: mockData.billing, payment: mockData.payment.card }));
  expect(mountToJson(component)).toMatchSnapshot();
});
