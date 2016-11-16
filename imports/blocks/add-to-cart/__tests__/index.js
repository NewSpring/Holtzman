import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import { CartContainerWithoutData as CartContainer } from "../";
import { SubFundWithoutData as SubFund } from "../Subfund";

jest.mock("../Subfund", () => jest.fn(() => <div />));
jest.mock("../../checkout-buttons", () => jest.fn(() => <div />));

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    clearTransactions: jest.fn(),
    accounts: [
      {
        id: "1",
        name: "test",
      }
    ],
    addTransactions: jest.fn(),
    give: "5",
  };
  return (
    <CartContainer {...defaultProps} {...additionalProps} />
  );
};

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

describe("componentWillMount", () => {
  it("calls clearTransactions", () => {
    const component = mount(generateComponent());
    expect(component.props().clearTransactions).toBeCalled();
  });
  it("monetizes the value");
  it("calls addTransaction with the right info");
});