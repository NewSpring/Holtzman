import renderer from "react-test-renderer";
import { SavedAccount } from "../";

const defaultProps = {
  account: {
    id: "1",
    name: "thing",
    payment: {
      paymentType: "Bank",
      accountNumber: "123456789",
    },
  },
  choose: () => {},
  savedAccount: {
    id: "2",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SavedAccount { ...newProps } />;
};

it("renders and checked false when savedAccount is not account", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("renders and checked true when savedAccount is account", () => {
  const result = renderer.create(generateComponent({
    savedAccount: {
      id: "1",
    },
  }));
  expect(result).toMatchSnapshot();
});
